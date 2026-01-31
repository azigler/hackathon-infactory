/**
 * Essay Export Utility (bd-327)
 *
 * Provides functionality for teachers to download student essays as TXT and DOCX files.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

/**
 * Strips all HTML tags from a string and returns plain text.
 * Preserves line breaks by converting block elements to newlines.
 *
 * @param html - The HTML string to strip tags from
 * @returns Plain text string with HTML tags removed
 */
export function stripHtmlTags(html: string): string {
  // Replace block-level elements with newlines to preserve structure
  let text = html
    // Replace closing block tags with newlines
    .replace(/<\/(p|div|h[1-6]|li|tr|br)>/gi, "\n")
    // Replace opening br tags
    .replace(/<br\s*\/?>/gi, "\n")
    // Remove all remaining HTML tags
    .replace(/<[^>]*>/g, "")
    // Decode common HTML entities
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    // Normalize multiple newlines to double newlines (paragraph breaks)
    .replace(/\n{3,}/g, "\n\n")
    // Trim whitespace from each line
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    // Trim leading/trailing whitespace
    .trim();

  return text;
}

/**
 * Exports essay content as a plain text file.
 *
 * @param essayHtml - The essay content in HTML format
 * @param filename - The name for the downloaded file (without extension)
 */
export function exportAsText(essayHtml: string, filename: string): void {
  const plainText = stripHtmlTags(essayHtml);
  const blob = new Blob([plainText], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${filename}.txt`);
}

interface ParsedElement {
  type: "heading" | "paragraph";
  level?: 1 | 2 | 3;
  runs: TextRunConfig[];
}

interface TextRunConfig {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

/**
 * Parses inline formatting from an HTML element's content.
 * Handles nested bold, italic, and underline tags.
 *
 * @param html - HTML string with potential inline formatting
 * @returns Array of text run configurations
 */
function parseInlineFormatting(html: string): TextRunConfig[] {
  const runs: TextRunConfig[] = [];

  // Simple regex-based parser for inline formatting
  // This handles common cases of <b>, <strong>, <i>, <em>, <u> tags

  // Create a temporary element to parse HTML (works in browser environment)
  if (typeof document !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    function processNode(
      node: Node,
      inherited: { bold?: boolean; italic?: boolean; underline?: boolean }
    ): void {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (text) {
          runs.push({
            text,
            bold: inherited.bold,
            italic: inherited.italic,
            underline: inherited.underline,
          });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();

        const newInherited = { ...inherited };

        if (tagName === "b" || tagName === "strong") {
          newInherited.bold = true;
        }
        if (tagName === "i" || tagName === "em") {
          newInherited.italic = true;
        }
        if (tagName === "u") {
          newInherited.underline = true;
        }

        for (const child of Array.from(node.childNodes)) {
          processNode(child, newInherited);
        }
      }
    }

    for (const child of Array.from(tempDiv.childNodes)) {
      processNode(child, {});
    }
  } else {
    // Fallback for non-browser environments: strip tags and return plain text
    runs.push({
      text: stripHtmlTags(html),
    });
  }

  return runs.length > 0 ? runs : [{ text: stripHtmlTags(html) }];
}

/**
 * Parses HTML content into structured elements for DOCX generation.
 *
 * @param html - The HTML content to parse
 * @returns Array of parsed elements
 */
function parseHtmlToElements(html: string): ParsedElement[] {
  const elements: ParsedElement[] = [];

  if (typeof document !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    function processElement(element: Element): void {
      const tagName = element.tagName.toLowerCase();

      if (tagName === "h1") {
        elements.push({
          type: "heading",
          level: 1,
          runs: parseInlineFormatting(element.innerHTML),
        });
      } else if (tagName === "h2") {
        elements.push({
          type: "heading",
          level: 2,
          runs: parseInlineFormatting(element.innerHTML),
        });
      } else if (tagName === "h3") {
        elements.push({
          type: "heading",
          level: 3,
          runs: parseInlineFormatting(element.innerHTML),
        });
      } else if (
        tagName === "p" ||
        tagName === "div" ||
        tagName === "li" ||
        tagName === "span"
      ) {
        const runs = parseInlineFormatting(element.innerHTML);
        if (runs.some((run) => run.text.trim())) {
          elements.push({
            type: "paragraph",
            runs,
          });
        }
      } else if (tagName === "ul" || tagName === "ol") {
        // Process list items
        for (const child of Array.from(element.children)) {
          processElement(child);
        }
      } else if (tagName === "br") {
        elements.push({
          type: "paragraph",
          runs: [{ text: "" }],
        });
      } else {
        // For other elements, try to process children or treat as paragraph
        if (element.children.length > 0) {
          for (const child of Array.from(element.children)) {
            processElement(child);
          }
        } else if (element.textContent?.trim()) {
          elements.push({
            type: "paragraph",
            runs: parseInlineFormatting(element.innerHTML),
          });
        }
      }
    }

    // Process top-level elements
    for (const child of Array.from(tempDiv.children)) {
      processElement(child);
    }

    // If no block elements found, treat the entire content as a single paragraph
    if (elements.length === 0 && tempDiv.textContent?.trim()) {
      elements.push({
        type: "paragraph",
        runs: parseInlineFormatting(html),
      });
    }
  } else {
    // Fallback for non-browser environments
    const plainText = stripHtmlTags(html);
    const paragraphs = plainText.split("\n\n").filter((p) => p.trim());

    for (const para of paragraphs) {
      elements.push({
        type: "paragraph",
        runs: [{ text: para }],
      });
    }
  }

  return elements;
}

/**
 * Converts a heading level to the corresponding docx HeadingLevel enum value.
 *
 * @param level - The heading level (1, 2, or 3)
 * @returns The corresponding HeadingLevel enum value
 */
function getHeadingLevel(
  level: 1 | 2 | 3
): (typeof HeadingLevel)[keyof typeof HeadingLevel] {
  switch (level) {
    case 1:
      return HeadingLevel.HEADING_1;
    case 2:
      return HeadingLevel.HEADING_2;
    case 3:
      return HeadingLevel.HEADING_3;
    default:
      return HeadingLevel.HEADING_1;
  }
}

/**
 * Creates docx TextRun objects from parsed text run configurations.
 *
 * @param runs - Array of text run configurations
 * @returns Array of docx TextRun objects
 */
function createTextRuns(runs: TextRunConfig[]): TextRun[] {
  return runs.map(
    (run) =>
      new TextRun({
        text: run.text,
        bold: run.bold,
        italics: run.italic,
        underline: run.underline ? {} : undefined,
      })
  );
}

/**
 * Exports essay content as a Word document (.docx).
 * Preserves formatting including bold, italic, underline, and headers.
 *
 * @param essayHtml - The essay content in HTML format
 * @param filename - The name for the downloaded file (without extension)
 */
export async function exportAsDocx(
  essayHtml: string,
  filename: string
): Promise<void> {
  const elements = parseHtmlToElements(essayHtml);

  const paragraphs: Paragraph[] = elements.map((element) => {
    if (element.type === "heading" && element.level) {
      return new Paragraph({
        children: createTextRuns(element.runs),
        heading: getHeadingLevel(element.level),
        spacing: {
          before: 240,
          after: 120,
        },
      });
    } else {
      return new Paragraph({
        children: createTextRuns(element.runs),
        alignment: AlignmentType.LEFT,
        spacing: {
          after: 200,
        },
      });
    }
  });

  // If no paragraphs were created, add an empty one to avoid invalid document
  if (paragraphs.length === 0) {
    paragraphs.push(
      new Paragraph({
        children: [new TextRun({ text: "" })],
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
}
