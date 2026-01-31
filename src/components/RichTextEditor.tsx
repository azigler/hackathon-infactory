// Rich Text Editor Component (bd-3pa)
// WYSIWYG editor using Tiptap for student essay writing

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect, useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  onActivity?: () => void
  placeholder?: string
}

// Toolbar button component
function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        px-2 py-1 rounded text-sm font-medium transition-colors
        ${isActive
          ? 'bg-atlantic-gold text-white'
          : 'bg-white text-atlantic-charcoal hover:bg-atlantic-pearl'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        border border-atlantic-pearl
      `}
    >
      {children}
    </button>
  )
}

// Toolbar divider
function ToolbarDivider() {
  return <div className="w-px h-6 bg-atlantic-pearl mx-1" />
}

export function RichTextEditor({
  content,
  onChange,
  onActivity,
  placeholder = 'Begin writing your essay here...',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-6 py-4 font-serif text-atlantic-charcoal',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
      onActivity?.()
    },
  })

  // Sync content from external changes (like loading demo data)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  // Track activity on keypress
  const handleKeyDown = useCallback(() => {
    onActivity?.()
  }, [onActivity])

  if (!editor) {
    return (
      <div className="border border-atlantic-pearl rounded-lg bg-white">
        <div className="p-6 text-atlantic-stone">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="border border-atlantic-pearl rounded-lg bg-white focus-within:border-atlantic-gold focus-within:ring-4 focus-within:ring-atlantic-gold/10">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-atlantic-pearl bg-atlantic-cream/50">
        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <span className="underline">U</span>
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2.75 9a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H2.75z" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM5 14.75a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM4.75 9a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H4.75z" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm5 10.5a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75zM6.75 9a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" />
          </svg>
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 100-2 1 1 0 000 2zm3.75-1a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75zM3 8a1 1 0 100-2 1 1 0 000 2zm3.75-1a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75zM3 12a1 1 0 100-2 1 1 0 000 2zm3.75-1a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.5 2.75a.75.75 0 00-1.5 0v1.5h-.25a.75.75 0 000 1.5H3.5v.75H2a.75.75 0 000 1.5h1.5v.75H2a.75.75 0 000 1.5h2.25a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75H3.5zM7 4.25a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 017 4.25zM7.75 8a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM7 12.75a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75z" />
          </svg>
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <div onKeyDown={handleKeyDown}>
        <EditorContent
          editor={editor}
          className="min-h-[400px]"
        />
        {/* Placeholder - shown when editor is empty */}
        {editor.isEmpty && (
          <div className="absolute top-14 left-6 text-atlantic-stone pointer-events-none font-serif text-lg whitespace-pre-line">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to count words in HTML content
export function countWordsInHtml(html: string): number {
  // Create a temporary element to parse HTML
  const temp = document.createElement('div')
  temp.innerHTML = html
  const text = temp.textContent || temp.innerText || ''
  return text.trim() ? text.trim().split(/\s+/).length : 0
}
