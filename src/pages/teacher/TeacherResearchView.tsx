import { useState, useEffect, type ReactNode } from 'react'
import { useParams, Link } from 'react-router-dom'
import { infactory, type SearchResult } from '../../lib/api/infactory'
import { useAppStore } from '../../lib/stores/app-store'
import { CLIMATE_CHANGE_ARTICLES, type CuratedArticle, getArticleContent } from '../../data/climate-change-articles'
import { AI_ARTICLES } from '../../data/ai-articles'

// Map topic IDs to search queries
const TOPIC_QUERIES: Record<string, string> = {
  'artificial-intelligence': 'artificial intelligence machine learning AI consciousness',
  'climate-change': 'climate change global warming environment IPCC',
  'technology-society': 'technology society democracy digital',
}

const TOPIC_TITLES: Record<string, string> = {
  'artificial-intelligence': 'Artificial Intelligence: Promise and Peril',
  'climate-change': 'Climate Change: Science and Society',
  'technology-society': 'Technology and Society',
}

interface Article {
  id: string
  title: string
  author: string
  year: string
  excerpt: string
  content: string
  topic: string
  section: string
}

// Transform curated articles to Article format (fallback when API is unavailable)
function transformCuratedArticle(article: CuratedArticle): Article {
  const fullContent = getArticleContent(article)
  return {
    id: article.chunk_id,
    title: article.title,
    author: article.author,
    year: article.published_at.split('-')[0],
    excerpt: article.excerpt.slice(0, 200) + '...',
    content: fullContent,
    topic: article.topic,
    section: article.section,
  }
}

// Get fallback articles for a topic
function getFallbackArticles(topicId: string): Article[] {
  switch (topicId) {
    case 'climate-change':
      return CLIMATE_CHANGE_ARTICLES.map(transformCuratedArticle)
    case 'artificial-intelligence':
    case 'technology-society':
      return AI_ARTICLES.map(transformCuratedArticle)
    default:
      return []
  }
}

export function TeacherResearchView() {
  const { classroomId } = useParams()
  const { getClassroomById } = useAppStore()

  // Get the actual classroom from store to find its topicId
  const classroom = classroomId ? getClassroomById(classroomId) : null
  const topicId = classroom?.topicId || classroomId || 'climate-change'

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Use teacher-specific highlights and notes from the store
  const {
    teacherHighlights,
    addTeacherHighlight,
    removeTeacherHighlight,
    teacherNotes,
    addTeacherNote,
  } = useAppStore()

  const [newNote, setNewNote] = useState('')
  const [highlightMode, setHighlightMode] = useState(false)

  // Get highlights for the currently selected article
  const currentArticleHighlights = selectedArticle
    ? teacherHighlights.filter((h) => h.articleId === selectedArticle.id)
    : []

  // Helper function to render text with highlighted portions
  const renderTextWithHighlights = (text: string): ReactNode => {
    if (currentArticleHighlights.length === 0) {
      return text
    }

    // Sort highlights by their position in the text
    const highlightRanges: { start: number; end: number; id: string }[] = []

    for (const h of currentArticleHighlights) {
      let searchStart = 0
      let index = text.indexOf(h.text, searchStart)
      while (index !== -1) {
        highlightRanges.push({
          start: index,
          end: index + h.text.length,
          id: h.id,
        })
        searchStart = index + h.text.length
        index = text.indexOf(h.text, searchStart)
      }
    }

    if (highlightRanges.length === 0) {
      return text
    }

    // Sort by start position
    highlightRanges.sort((a, b) => a.start - b.start)

    // Merge overlapping ranges
    const mergedRanges: { start: number; end: number }[] = []
    for (const range of highlightRanges) {
      if (mergedRanges.length === 0) {
        mergedRanges.push({ start: range.start, end: range.end })
      } else {
        const last = mergedRanges[mergedRanges.length - 1]
        if (range.start <= last.end) {
          last.end = Math.max(last.end, range.end)
        } else {
          mergedRanges.push({ start: range.start, end: range.end })
        }
      }
    }

    // Build the result with highlighted spans
    const result: ReactNode[] = []
    let lastEnd = 0

    for (let i = 0; i < mergedRanges.length; i++) {
      const range = mergedRanges[i]
      if (range.start > lastEnd) {
        result.push(text.slice(lastEnd, range.start))
      }
      result.push(
        <mark key={`highlight-${i}`} className="bg-blue-200 rounded px-0.5">
          {text.slice(range.start, range.end)}
        </mark>
      )
      lastEnd = range.end
    }

    if (lastEnd < text.length) {
      result.push(text.slice(lastEnd))
    }

    return result
  }

  // Fetch articles from Infactory API with fallback to curated data
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      setError(null)

      let transformedArticles: Article[] = []

      try {
        const query = TOPIC_QUERIES[topicId] || 'artificial intelligence'
        console.log('Fetching articles for topic:', topicId, 'with query:', query)

        const results = await infactory.search(query, { top_k: 10 })
        console.log('API returned', results?.length || 0, 'results')

        if (results && results.length > 0) {
          transformedArticles = results.map((result: SearchResult) => ({
            id: result.chunk.chunk_id,
            title: result.chunk.title,
            author: result.chunk.author,
            year: result.chunk.published_at.split('-')[0],
            excerpt: result.chunk.excerpt.slice(0, 200) + '...',
            content: result.chunk.excerpt,
            topic: result.chunk.topic,
            section: result.chunk.section,
          }))
        }
      } catch (err) {
        console.error('API failed, falling back to curated data:', err)
      }

      if (transformedArticles.length === 0) {
        console.log('Using fallback curated articles for topic:', topicId)
        transformedArticles = getFallbackArticles(topicId)
      }

      if (transformedArticles.length === 0) {
        setError('No articles available for this topic. Please try again later.')
      } else {
        setArticles(transformedArticles)
        setSelectedArticle(transformedArticles[0])
      }

      setLoading(false)
    }

    fetchArticles()
  }, [topicId])

  const handleHighlight = () => {
    if (!highlightMode) return

    const selection = window.getSelection()
    if (selection && selection.toString().trim() && selectedArticle) {
      const text = selection.toString().trim()
      const alreadyHighlighted = teacherHighlights.some(
        (h) => h.articleId === selectedArticle.id && h.text === text
      )
      if (!alreadyHighlighted) {
        addTeacherHighlight({
          id: `teacher-${Date.now()}`,
          text,
          articleId: selectedArticle.id,
          articleTitle: selectedArticle.title,
        })
      }
      selection.removeAllRanges()
    }
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      addTeacherNote({
        id: `teacher-${Date.now()}`,
        content: newNote.trim(),
      })
      setNewNote('')
    }
  }

  const topicTitle = TOPIC_TITLES[topicId] || 'Research Materials'

  return (
    <div className="min-h-screen bg-atlantic-cream flex flex-col">
      {/* Header - Teacher Preview indicator */}
      <header className="bg-atlantic-charcoal text-white py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/teacher/review/${classroomId}`} className="text-atlantic-silver hover:text-white">
              ← Back to Review
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-semibold">{topicTitle}</h1>
                <span className="bg-atlantic-gold text-atlantic-charcoal text-xs font-bold px-2 py-0.5 rounded">
                  Teacher Preview
                </span>
              </div>
              <p className="text-atlantic-silver text-sm">Preview classroom materials as students see them</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-atlantic-silver text-sm">
              {teacherHighlights.length} highlights - {teacherNotes.length} notes
            </span>
          </div>
        </div>
      </header>

      {/* Assignment Banner */}
      {classroom?.assignmentPrompt && (
        <div className="bg-atlantic-gold/10 border-b border-atlantic-gold/30 px-6 py-3">
          <div className="max-w-6xl mx-auto">
            <span className="text-atlantic-gold font-medium text-sm">Assignment: </span>
            <span className="text-atlantic-charcoal text-sm">
              {classroom.assignmentPrompt}
            </span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">&#x27F3;</div>
            <p className="text-atlantic-stone">Loading articles from The Atlantic archive...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">&#x26A0;</div>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-secondary mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Three Panel Layout */}
      {!loading && !error && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Source List */}
          <div className="w-80 border-r border-atlantic-pearl bg-white overflow-y-auto">
            <div className="p-4 border-b border-atlantic-pearl">
              <h2 className="font-serif text-lg font-semibold text-atlantic-charcoal">
                Available Sources
              </h2>
              <p className="text-atlantic-stone text-sm mt-1">
                {articles.length} articles in this classroom
              </p>
            </div>
            <div className="p-2">
              {articles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`w-full text-left p-3 rounded mb-2 transition-all ${
                    selectedArticle?.id === article.id
                      ? 'bg-atlantic-gold/10 border-l-4 border-atlantic-gold'
                      : 'hover:bg-atlantic-cream'
                  }`}
                >
                  <div className="font-medium text-atlantic-charcoal text-sm">
                    {article.title}
                  </div>
                  <div className="text-atlantic-stone text-xs mt-1">
                    {article.author}, {article.year}
                  </div>
                  <div className="text-atlantic-stone text-xs mt-1 italic">
                    {article.section}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Center Panel - Reading Pane */}
          <div className="flex-1 flex flex-col bg-white relative">
            {selectedArticle ? (
              <>
                {/* Toolbar */}
                <div className="sticky top-0 z-10 border-b border-atlantic-pearl px-4 py-2 flex items-center gap-2 bg-atlantic-cream/95 backdrop-blur-sm shadow-sm">
                  <span className="text-xs text-atlantic-stone uppercase tracking-wider mr-2">Tools:</span>
                  <button
                    onClick={() => setHighlightMode(!highlightMode)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-all ${
                      highlightMode
                        ? 'bg-blue-300 border-blue-400 text-atlantic-charcoal shadow-inner'
                        : 'bg-white border-atlantic-pearl text-atlantic-slate hover:bg-atlantic-cream hover:border-atlantic-stone'
                    }`}
                    title={highlightMode ? 'Click to turn off highlighter' : 'Click to highlight text'}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-4 h-4 ${highlightMode ? 'text-blue-700' : ''}`}
                    >
                      <path d="M15.2 3.8l5 5L9 20H4v-5L15.2 3.8zM17.6 9.4l-3-3L6 15v3h3l8.6-8.6z"/>
                      <path d="M4 21h16v1H4z" className={highlightMode ? 'fill-blue-500' : 'fill-current'}/>
                    </svg>
                    <span className="text-xs font-medium">
                      {highlightMode ? 'Highlighting' : 'Highlighter'}
                    </span>
                    {highlightMode && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </button>
                </div>

                {/* Article content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-2xl mx-auto p-8">
                    <div className="mb-6">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <span className="meta-tag">{selectedArticle.year}</span>
                        <span className="meta-tag">{selectedArticle.section}</span>
                        <span className="meta-tag">{selectedArticle.topic}</span>
                      </div>
                      <h1 className="font-serif text-3xl font-bold text-atlantic-charcoal mb-2">
                        {selectedArticle.title}
                      </h1>
                      <p className="text-atlantic-slate text-lg">
                        By {selectedArticle.author}
                      </p>
                    </div>
                    <div
                      className={`prose prose-lg text-atlantic-slate leading-relaxed ${
                        highlightMode ? 'cursor-text selection:bg-blue-200' : ''
                      }`}
                      onMouseUp={handleHighlight}
                    >
                      {selectedArticle.content.split('\n\n').map((para, i) => (
                        <p key={i} className="mb-4">
                          {renderTextWithHighlights(para)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">&#x1F4D6;</div>
                  <p className="text-atlantic-stone">
                    Select an article from the left to begin reading
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Notes & Highlights */}
          <div className="w-80 border-l border-atlantic-pearl bg-atlantic-cream flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-atlantic-pearl bg-white flex-shrink-0">
              <h2 className="font-serif text-lg font-semibold text-atlantic-charcoal">
                Your Notes
              </h2>
              <p className="text-atlantic-stone text-xs mt-1">
                Personal notes - not visible to students
              </p>
            </div>

            {/* Highlights Section */}
            <div className="flex-1 flex flex-col min-h-0 border-b border-atlantic-pearl">
              <div className="p-3 bg-atlantic-cream/50 border-b border-atlantic-pearl flex-shrink-0">
                <h3 className="label mb-0">Highlights ({teacherHighlights.length})</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {teacherHighlights.length > 0 ? (
                  <div className="space-y-2">
                    {teacherHighlights.map((h) => (
                      <div
                        key={h.id}
                        className="bg-blue-100 border-l-2 border-blue-400 p-2 text-sm text-atlantic-slate group relative"
                      >
                        <button
                          onClick={() => removeTeacherHighlight(h.id)}
                          className="absolute top-1 right-1 p-1 rounded hover:bg-red-100 text-atlantic-stone hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete highlight"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                        <div className="italic pr-6 text-xs">"{h.text}"</div>
                        {h.articleTitle && (
                          <div className="text-xs text-atlantic-stone mt-1">
                            - {h.articleTitle}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-atlantic-stone text-sm italic">
                    No highlights yet. Enable highlight mode and select text.
                  </p>
                )}
              </div>
            </div>

            {/* Notes Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 bg-atlantic-cream/50 border-b border-atlantic-pearl flex-shrink-0">
                <h3 className="label mb-0">Notes ({teacherNotes.length})</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2 mb-3">
                  {teacherNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white p-2 rounded border border-atlantic-pearl text-sm text-atlantic-slate"
                    >
                      {note.content}
                    </div>
                  ))}
                </div>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="input text-sm min-h-[60px]"
                  placeholder="Add a note..."
                />
                <button
                  onClick={handleAddNote}
                  className="btn btn-secondary w-full mt-2 text-sm"
                  disabled={!newNote.trim()}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
