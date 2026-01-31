// Citation validation service for The Beat
// Validates student citations against the required format

export interface ArticleMetadata {
  title: string
  author: string
  publishedAt: string
  section: string
}

export interface CitationValidation {
  isValid: boolean
  hints: string[] // Guidance on how to fix (never gives the answer)
}

type CitationFormat = 'mla' | 'apa' | 'chicago'

/**
 * Citation format examples for display to students
 */
export const CITATION_FORMAT_EXAMPLES: Record<CitationFormat, string> = {
  mla: 'Author Last, First. "Article Title." *The Atlantic*, Day Month Year.',
  apa: 'Author Last, F. (Year, Month Day). Article title. *The Atlantic*. URL',
  chicago: 'Author Last, First. "Article Title." *The Atlantic*, Month Day, Year.',
}

/**
 * Detailed citation format descriptions
 */
export const CITATION_FORMAT_DESCRIPTIONS: Record<CitationFormat, string[]> = {
  mla: [
    'Author\'s last name, followed by first name',
    'Article title in quotation marks',
    'Publication name in italics (The Atlantic)',
    'Publication date: Day Month Year',
  ],
  apa: [
    'Author\'s last name, followed by first initial',
    'Year, Month Day in parentheses',
    'Article title (only first word capitalized)',
    'Publication name in italics',
    'URL (if available)',
  ],
  chicago: [
    'Author\'s last name, followed by first name',
    'Article title in quotation marks',
    'Publication name in italics',
    'Publication date: Month Day, Year',
  ],
}

/**
 * Helper to extract the last name from author string
 */
function extractLastName(author: string): string {
  const parts = author.trim().split(' ')
  return parts[parts.length - 1].toLowerCase()
}

/**
 * Helper to extract the first name from author string
 */
function extractFirstName(author: string): string {
  const parts = author.trim().split(' ')
  return parts[0].toLowerCase()
}

/**
 * Helper to extract year from published date
 */
function extractYear(publishedAt: string): string {
  return publishedAt.split('-')[0]
}

/**
 * Helper to get month name from date string
 */
function extractMonthName(publishedAt: string): string {
  const date = new Date(publishedAt)
  return date.toLocaleString('en-US', { month: 'long' }).toLowerCase()
}

/**
 * Validates a student's citation against the expected format
 * Returns hints for improvement without giving away the answer
 */
export function validateCitation(
  articleMetadata: ArticleMetadata,
  studentCitation: string,
  format: CitationFormat
): CitationValidation {
  const hints: string[] = []
  const citation = studentCitation.trim().toLowerCase()
  const authorLastName = extractLastName(articleMetadata.author)
  const authorFirstName = extractFirstName(articleMetadata.author)
  const year = extractYear(articleMetadata.publishedAt)
  const month = extractMonthName(articleMetadata.publishedAt)
  const titleWords = articleMetadata.title.toLowerCase().split(' ').filter(w => w.length > 3)

  // Empty citation check
  if (!studentCitation.trim()) {
    return {
      isValid: false,
      hints: ['Please enter a citation for this source.'],
    }
  }

  // Check for author's last name
  if (!citation.includes(authorLastName)) {
    hints.push('Make sure to include the author\'s last name.')
  }

  // Check for author's first name (or initial for APA)
  const hasFirstName = citation.includes(authorFirstName)
  const hasFirstInitial = citation.includes(authorFirstName.charAt(0) + '.')

  if (format === 'apa') {
    if (!hasFirstInitial && !hasFirstName) {
      hints.push('In APA format, include the author\'s first initial followed by a period.')
    }
  } else {
    if (!hasFirstName) {
      hints.push('Include the author\'s first name in your citation.')
    }
  }

  // Check for title (at least some words from it)
  const hasTitle = titleWords.some(word => citation.includes(word))
  if (!hasTitle) {
    hints.push('Include the article title in your citation.')
  }

  // Check for quotation marks around title (MLA and Chicago)
  if (format === 'mla' || format === 'chicago') {
    if (!studentCitation.includes('"')) {
      hints.push('Article titles should be enclosed in quotation marks.')
    }
  }

  // Check for year
  if (!citation.includes(year)) {
    hints.push('Include the publication year.')
  }

  // Check for The Atlantic
  if (!citation.includes('atlantic')) {
    hints.push('Include the publication name (The Atlantic).')
  }

  // Check for italics indicator (asterisks or underscores commonly used)
  const hasItalicsIndicator = studentCitation.includes('*') ||
                              studentCitation.includes('_') ||
                              studentCitation.includes('<i>') ||
                              studentCitation.includes('<em>')
  if (!hasItalicsIndicator) {
    hints.push('The publication name should be italicized. Use *asterisks* or _underscores_ to indicate italics.')
  }

  // Format-specific checks
  if (format === 'mla') {
    // MLA uses "Day Month Year" format
    if (!citation.includes(month)) {
      hints.push('In MLA format, spell out the full month name.')
    }
    // Check for period at end
    if (!studentCitation.trim().endsWith('.')) {
      hints.push('MLA citations should end with a period.')
    }
  }

  if (format === 'apa') {
    // APA uses parentheses around date
    if (!studentCitation.includes('(') || !studentCitation.includes(')')) {
      hints.push('In APA format, the date should be in parentheses.')
    }
    // Check for period at end
    if (!studentCitation.trim().endsWith('.')) {
      hints.push('APA citations should end with a period.')
    }
  }

  if (format === 'chicago') {
    // Chicago uses "Month Day, Year" format
    if (!citation.includes(month)) {
      hints.push('In Chicago format, spell out the full month name.')
    }
    // Check for period at end
    if (!studentCitation.trim().endsWith('.')) {
      hints.push('Chicago citations should end with a period.')
    }
  }

  // Check for proper punctuation (commas, periods)
  const hasCommas = studentCitation.includes(',')
  if (!hasCommas) {
    hints.push('Citations typically use commas to separate different elements.')
  }

  // Determine if valid (allow up to 1 minor hint for valid status)
  const isValid = hints.length === 0

  return {
    isValid,
    hints: hints.length > 0 ? hints.slice(0, 3) : [], // Limit to top 3 hints
  }
}

/**
 * Generates a properly formatted citation for an article
 * This is for internal reference only - not shown to students
 */
export function generateCorrectCitation(
  articleMetadata: ArticleMetadata,
  format: CitationFormat
): string {
  const date = new Date(articleMetadata.publishedAt)
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const shortMonth = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()
  const nameParts = articleMetadata.author.split(' ')
  const lastName = nameParts[nameParts.length - 1]
  const firstName = nameParts.slice(0, -1).join(' ')
  const firstInitial = firstName.charAt(0)

  switch (format) {
    case 'mla':
      return `${lastName}, ${firstName}. "${articleMetadata.title}." *The Atlantic*, ${day} ${shortMonth}. ${year}.`

    case 'apa':
      // APA: Article title should only have first word capitalized
      const apaTitle = articleMetadata.title.charAt(0).toUpperCase() +
                       articleMetadata.title.slice(1).toLowerCase()
      return `${lastName}, ${firstInitial}. (${year}, ${month} ${day}). ${apaTitle}. *The Atlantic*.`

    case 'chicago':
      return `${lastName}, ${firstName}. "${articleMetadata.title}." *The Atlantic*, ${month} ${day}, ${year}.`

    default:
      return ''
  }
}
