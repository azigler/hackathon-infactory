import { useState, useEffect, type ReactNode } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { infactory, type SearchResult } from '../../lib/api/infactory'
import { useAppStore } from '../../lib/stores/app-store'
import { CLIMATE_CHANGE_ARTICLES, type CuratedArticle, getArticleContent } from '../../data/climate-change-articles'
import { AI_ARTICLES } from '../../data/ai-articles'

// Check if demo controls should be visible
function useDemoControlsVisible() {
  const [searchParams] = useSearchParams()
  const isDev = import.meta.env.DEV
  const hasParam = searchParams.get('demo') === 'true'
  return isDev || hasParam
}

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

const TOPIC_ASSIGNMENTS: Record<string, string> = {
  'artificial-intelligence': 'Write an essay exploring whether AI represents a greater opportunity or threat to humanity. Use at least 3 sources from the archive to support your argument.',
  'climate-change': 'Analyze how climate change coverage in The Atlantic has evolved. What perspectives are represented? What solutions are proposed?',
  'technology-society': 'Examine the relationship between technology and democracy as presented in these articles. What are the key tensions?',
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
    content: fullContent, // Use full article content for reading
    topic: article.topic,
    section: article.section,
  }
}

// Build a lookup map for curated article content by chunk_id
// This allows enriching API results with full content when available
function buildCuratedContentMap(): Map<string, string> {
  const contentMap = new Map<string, string>()
  const allCuratedArticles = [...CLIMATE_CHANGE_ARTICLES, ...AI_ARTICLES]
  for (const article of allCuratedArticles) {
    const fullContent = getArticleContent(article)
    contentMap.set(article.chunk_id, fullContent)
  }
  return contentMap
}

// Transform API SearchResult to Article format, enriching with curated content when available
function transformSearchResult(result: SearchResult, curatedContentMap: Map<string, string>): Article {
  // Check if we have curated full content for this article
  const curatedContent = curatedContentMap.get(result.chunk.chunk_id)
  // Use curated full content if available, otherwise fall back to API excerpt
  const content = curatedContent || result.chunk.excerpt

  return {
    id: result.chunk.chunk_id,
    title: result.chunk.title,
    author: result.chunk.author,
    year: result.chunk.published_at.split('-')[0],
    excerpt: result.chunk.excerpt.slice(0, 200) + '...',
    content: content,
    topic: result.chunk.topic,
    section: result.chunk.section,
  }
}

// Get fallback articles for a topic
function getFallbackArticles(topicId: string): Article[] {
  switch (topicId) {
    case 'climate-change':
      return CLIMATE_CHANGE_ARTICLES.map(transformCuratedArticle)
    case 'artificial-intelligence':
    case 'technology-society':
      // AI articles cover both AI and technology-society topics
      return AI_ARTICLES.map(transformCuratedArticle)
    default:
      return []
  }
}

export function ResearchWorkspace() {
  const { classroomId } = useParams()
  const { getClassroomById } = useAppStore()

  // Get the actual classroom from store to find its topicId
  // classroomId can be a UUID (from joinClassroom) OR a legacy topicId string
  const classroom = classroomId ? getClassroomById(classroomId) : null

  // Use classroom's topicId if found, otherwise try using classroomId directly as topicId (legacy support)
  const topicId = classroom?.topicId || classroomId || 'climate-change'

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Use global store for highlights, notes, and demo mode
  const { highlights, addHighlight, removeHighlight, notes, addNote, removeNote, demoMode, setDemoMode } = useAppStore()
  const [newNote, setNewNote] = useState('')
  const [highlightMode, setHighlightMode] = useState(false)
  const showDemoControls = useDemoControlsVisible()

  // Get highlights for the currently selected article
  const currentArticleHighlights = selectedArticle
    ? highlights.filter((h) => h.articleId === selectedArticle.id)
    : []

  // Helper function to render text with highlighted portions
  const renderTextWithHighlights = (text: string): ReactNode => {
    if (currentArticleHighlights.length === 0) {
      return text
    }

    // Sort highlights by their position in the text (find each highlighted text)
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
      // Add text before this highlight
      if (range.start > lastEnd) {
        result.push(text.slice(lastEnd, range.start))
      }
      // Add the highlighted text
      result.push(
        <mark key={`highlight-${i}`} className="bg-yellow-200 rounded px-0.5">
          {text.slice(range.start, range.end)}
        </mark>
      )
      lastEnd = range.end
    }

    // Add remaining text after the last highlight
    if (lastEnd < text.length) {
      result.push(text.slice(lastEnd))
    }

    return result
  }

  // Fetch articles from Infactory API with fallback to curated data
  // Always loads default topic articles, and adds custom articles if the teacher specified them
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      setError(null)

      let defaultArticles: Article[] = []
      let customArticles: Article[] = []

      // Build curated content map once for enriching API results
      const curatedContentMap = buildCuratedContentMap()

      try {
        // Step 1: Always fetch default topic-based articles first
        const query = TOPIC_QUERIES[topicId] || 'artificial intelligence'
        console.log('Fetching default articles for topic:', topicId, 'with query:', query)

        const results = await infactory.search(query, { top_k: 10 })
        console.log('API returned', results?.length || 0, 'default topic results')

        // Transform API results to our Article format, enriching with curated content
        if (results && results.length > 0) {
          defaultArticles = results.map((result: SearchResult) =>
            transformSearchResult(result, curatedContentMap)
          )
        }

        // Step 2: If the classroom has custom articles, fetch those additionally
        const customArticleIds = classroom?.customArticles

        if (customArticleIds && customArticleIds.length > 0) {
          console.log('Fetching custom articles for classroom:', classroomId, 'IDs:', customArticleIds)

          // Fetch custom articles by their chunk IDs
          const customResults = await infactory.getArticlesByChunkIds(customArticleIds)
          console.log('Custom articles API returned', customResults?.length || 0, 'results')

          if (customResults && customResults.length > 0) {
            customArticles = customResults.map((result: SearchResult) =>
              transformSearchResult(result, curatedContentMap)
            )
          }

          // If API didn't return all custom articles, try to find them in curated data as fallback
          if (customArticles.length < customArticleIds.length) {
            const foundIds = new Set(customArticles.map((a) => a.id))
            const missingIds = customArticleIds.filter((id) => !foundIds.has(id))

            // Search curated articles for missing IDs
            const allCuratedArticles = [...CLIMATE_CHANGE_ARTICLES, ...AI_ARTICLES]
            const curatedMatches = allCuratedArticles
              .filter((article) => missingIds.includes(article.chunk_id))
              .map(transformCuratedArticle)

            customArticles = [...customArticles, ...curatedMatches]
            console.log('Added', curatedMatches.length, 'articles from curated data for missing IDs')
          }
        }
      } catch (err) {
        console.error('API failed, falling back to curated data:', err)
      }

      // Fallback to curated data if API returned no default articles
      if (defaultArticles.length === 0) {
        console.log('Using fallback curated articles for topic:', topicId)
        defaultArticles = getFallbackArticles(topicId)
      }

      // Step 3: Merge custom articles (first) with default articles, removing duplicates by ID
      const seenIds = new Set<string>()
      const mergedArticles: Article[] = []

      // Add custom articles first (they appear at the top)
      for (const article of customArticles) {
        if (!seenIds.has(article.id)) {
          seenIds.add(article.id)
          mergedArticles.push(article)
        }
      }

      // Add default articles, skipping any that are already in the list
      for (const article of defaultArticles) {
        if (!seenIds.has(article.id)) {
          seenIds.add(article.id)
          mergedArticles.push(article)
        }
      }

      console.log('Merged articles:', mergedArticles.length, '(custom:', customArticles.length, '+ default:', defaultArticles.length, '- duplicates)')

      if (mergedArticles.length === 0) {
        setError('No articles available for this topic. Please try again later.')
      } else {
        setArticles(mergedArticles)
        // Auto-select first article
        setSelectedArticle(mergedArticles[0])
      }

      setLoading(false)
    }

    fetchArticles()
  }, [topicId, classroom, classroomId])

  const handleHighlight = () => {
    // Only create highlights when highlight mode is enabled
    if (!highlightMode) return

    const selection = window.getSelection()
    if (selection && selection.toString().trim() && selectedArticle) {
      const text = selection.toString().trim()
      // Check if this exact text is already highlighted for this article
      const alreadyHighlighted = highlights.some(
        (h) => h.articleId === selectedArticle.id && h.text === text
      )
      if (!alreadyHighlighted) {
        addHighlight({
          id: Date.now().toString(),
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
      addNote({
        id: Date.now().toString(),
        content: newNote.trim(),
      })
      setNewNote('')
    }
  }

  const topicTitle = TOPIC_TITLES[topicId] || 'Research Workspace'
  const assignment = TOPIC_ASSIGNMENTS[topicId] || 'Complete your research and write an essay based on the sources provided.'

  return (
    <div className="min-h-screen bg-atlantic-cream flex flex-col">
      {/* Header */}
      <header className="bg-atlantic-charcoal text-white py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/student" className="text-atlantic-silver hover:text-white">
              ← Back
            </Link>
            <div>
              <h1 className="font-serif text-xl font-semibold">{topicTitle}</h1>
              <p className="text-atlantic-silver text-sm">Research Workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-atlantic-silver text-sm">
              {highlights.length} highlights • {notes.length} notes
            </span>
            <Link
              to={`/student/classroom/${classroomId}/write`}
              className="btn btn-primary"
            >
              Open Writing Station
            </Link>
          </div>
        </div>
      </header>

      {/* Assignment Banner */}
      <div className="bg-atlantic-gold/10 border-b border-atlantic-gold/30 px-6 py-3">
        <div className="max-w-6xl mx-auto">
          <span className="text-atlantic-gold font-medium text-sm">Assignment: </span>
          <span className="text-atlantic-charcoal text-sm">
            {assignment}
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⟳</div>
            <p className="text-atlantic-stone">Loading articles from The Atlantic archive...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
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
                {/* Floating Highlighter Button - Fixed position that stays visible on scroll */}
                <button
                  onClick={() => setHighlightMode(!highlightMode)}
                  className={`fixed bottom-6 right-96 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all ${
                    highlightMode
                      ? 'bg-yellow-400 border-2 border-yellow-500 text-atlantic-charcoal shadow-yellow-200'
                      : 'bg-white border-2 border-atlantic-pearl text-atlantic-slate hover:bg-atlantic-cream hover:border-atlantic-stone hover:shadow-xl'
                  }`}
                  title={highlightMode ? 'Click to turn off highlighter' : 'Click to highlight text'}
                >
                  {/* Highlighter icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-5 h-5 ${highlightMode ? 'text-yellow-700' : ''}`}
                  >
                    <path d="M15.2 3.8l5 5L9 20H4v-5L15.2 3.8zM17.6 9.4l-3-3L6 15v3h3l8.6-8.6z"/>
                    <path d="M4 21h16v1H4z" className={highlightMode ? 'fill-yellow-500' : 'fill-current'}/>
                  </svg>
                  <span className="text-sm font-medium">
                    {highlightMode ? 'Highlighting ON' : 'Highlighter'}
                  </span>
                  {highlightMode && (
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-600 animate-pulse" />
                  )}
                </button>
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
                        highlightMode ? 'cursor-text selection:bg-yellow-200' : ''
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
                  <div className="text-4xl mb-4">📖</div>
                  <p className="text-atlantic-stone">
                    Select an article from the left to begin reading
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Notes & Highlights - Split 50/50 */}
          <div className="w-80 border-l border-atlantic-pearl bg-atlantic-cream flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-atlantic-pearl bg-white flex-shrink-0">
              <h2 className="font-serif text-lg font-semibold text-atlantic-charcoal">
                Your Research
              </h2>
            </div>

            {/* Highlights Section - 50% with scroll */}
            <div className="flex-1 flex flex-col min-h-0 border-b border-atlantic-pearl">
              <div className="p-3 bg-atlantic-cream/50 border-b border-atlantic-pearl flex-shrink-0">
                <h3 className="label mb-0">Highlights ({highlights.length})</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {highlights.length > 0 ? (
                  <div className="space-y-2">
                    {highlights.map((h) => (
                      <div
                        key={h.id}
                        className="bg-atlantic-gold/10 border-l-2 border-atlantic-gold p-2 text-sm text-atlantic-slate group relative"
                      >
                        <button
                          onClick={() => removeHighlight(h.id)}
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

            {/* Notes Section - 50% with scroll */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 bg-atlantic-cream/50 border-b border-atlantic-pearl flex-shrink-0">
                <h3 className="label mb-0">Notes ({notes.length})</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2 mb-3">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white p-2 rounded border border-atlantic-pearl text-sm text-atlantic-slate group relative"
                    >
                      <button
                        onClick={() => removeNote(note.id)}
                        className="absolute top-1 right-1 p-1 rounded hover:bg-red-100 text-atlantic-stone hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete note"
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
                      <span className="pr-6">{note.content}</span>
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

            {/* Demo Controls - Quick Jump */}
            {showDemoControls && (
              <div className="p-4 border-t border-atlantic-pearl bg-atlantic-charcoal/5">
                <div className="text-xs text-atlantic-stone uppercase tracking-wider mb-2">
                  Demo Controls
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDemoMode('day1')}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                      demoMode === 'day1'
                        ? 'bg-atlantic-charcoal text-white'
                        : 'bg-white border border-atlantic-pearl text-atlantic-slate hover:bg-atlantic-cream'
                    }`}
                  >
                    Day 1
                  </button>
                  <button
                    onClick={() => setDemoMode('day30')}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                      demoMode === 'day30'
                        ? 'bg-atlantic-gold text-white'
                        : 'bg-white border border-atlantic-pearl text-atlantic-slate hover:bg-atlantic-cream'
                    }`}
                  >
                    Skip to Day 30
                  </button>
                </div>
                <p className="text-xs text-atlantic-stone mt-2 italic">
                  {demoMode === 'day1'
                    ? 'Fresh start - no research yet'
                    : 'Research complete - ready to write'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
