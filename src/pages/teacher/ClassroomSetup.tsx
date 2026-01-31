import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout } from '../../components/layout/PageLayout'
import { CLIMATE_CHANGE_ARTICLES, type CuratedArticle } from '../../data/climate-change-articles'
import { AI_ARTICLES } from '../../data/ai-articles'
import { useAppStore, type ClassroomWithShareCode, type CitationStyle } from '../../lib/stores/app-store'
import { infactory, type SearchResult } from '../../lib/api/infactory'

// Citation style options with descriptions
const CITATION_STYLES: { value: CitationStyle; label: string; description: string }[] = [
  { value: 'mla', label: 'MLA', description: 'Modern Language Association (Humanities)' },
  { value: 'apa', label: 'APA', description: 'American Psychological Association (Sciences)' },
  { value: 'chicago', label: 'Chicago', description: 'Chicago Manual of Style (History)' },
]

// Map topic IDs to their article sets
const TOPIC_ARTICLES: Record<string, CuratedArticle[]> = {
  'climate-change': CLIMATE_CHANGE_ARTICLES,
  'artificial-intelligence': AI_ARTICLES,
  'technology-society': AI_ARTICLES, // Reuse AI articles for tech-society topic
}

// Curated topic details for classroom setup
// These match the topics in TeacherDashboard CURATED_TOPICS
const CURATED_TOPIC_DETAILS = {
  'climate-change': {
    id: 'climate-change',
    title: 'Climate Change: Science and Society',
    description:
      'Four years of reporting on environmental science, policy debates, and solutions—from IPCC reports to COP30.',
    articleCount: CLIMATE_CHANGE_ARTICLES.length,
    dateRange: { start: '2022', end: '2025' },
    sampleArticles: CLIMATE_CHANGE_ARTICLES.slice(0, 3).map((a) => ({
      title: a.title,
      author: a.author,
      year: a.published_at.split('-')[0],
    })),
    suggestedAssignments: [
      'Analyze how climate change coverage in The Atlantic has evolved. What perspectives are represented? What solutions are proposed?',
      'Compare the scientific and political perspectives on climate action presented in these articles.',
      'Write an op-ed responding to one of these articles, using evidence from at least two other sources.',
    ],
  },
  'artificial-intelligence': {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence: Promise and Peril',
    description:
      'From consciousness questions to societal impact—explore how The Atlantic has covered the AI revolution from 2022-2024.',
    articleCount: 10,
    dateRange: { start: '2022', end: '2024' },
    sampleArticles: [
      { title: 'Of God and Machines', author: 'Ross Andersen', year: '2024' },
      { title: 'AI Isn\'t Omnipotent. It\'s Janky.', author: 'Charlie Warzel', year: '2023' },
      { title: 'In Defense of Humanity', author: 'Franklin Foer', year: '2023' },
    ],
    suggestedAssignments: [
      'Write an essay exploring whether AI represents a greater opportunity or threat to humanity. Use at least 3 sources to support your argument.',
      'Analyze how The Atlantic\'s coverage of AI has shifted from technical curiosity to societal concern.',
      'Compare different authors\' perspectives on AI consciousness and what makes their arguments compelling or weak.',
    ],
  },
  'technology-society': {
    id: 'technology-society',
    title: 'Technology and Society',
    description:
      'How technology shapes democracy, creativity, and human connection—featuring critical perspectives on our digital age.',
    articleCount: 10,
    dateRange: { start: '2022', end: '2025' },
    sampleArticles: [
      { title: 'When AI Becomes a Ouija Board', author: 'Ian Bogost', year: '2023' },
      { title: 'The World Still Hasn\'t Made Sense of ChatGPT', author: 'Matteo Wong', year: '2024' },
      { title: 'AI and the Fight Between Democracy and Autocracy', author: 'Adrienne LaFrance', year: '2023' },
    ],
    suggestedAssignments: [
      'Examine the relationship between technology and democracy as presented in these articles. What are the key tensions?',
      'Write a persuasive essay arguing for or against greater regulation of social media platforms.',
      'Analyze how different Atlantic authors approach the question of technology\'s impact on human creativity.',
    ],
  },
}

export function ClassroomSetup() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const [assignmentPrompt, setAssignmentPrompt] = useState('')
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [createdClassroom, setCreatedClassroom] = useState<ClassroomWithShareCode | null>(null)
  const [copied, setCopied] = useState(false)
  const [expandedArticles, setExpandedArticles] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [expandedSearchResults, setExpandedSearchResults] = useState<Set<string>>(new Set())
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('mla')
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set())

  const createClassroom = useAppStore((state) => state.createClassroom)
  const setDemoMode = useAppStore((state) => state.setDemoMode)

  // Get topic from curated data
  const topic = CURATED_TOPIC_DETAILS[topicId as keyof typeof CURATED_TOPIC_DETAILS]

  // Get articles for this topic
  const articles = topicId ? TOPIC_ARTICLES[topicId] || [] : []

  const toggleArticleExpanded = (articleId: number) => {
    setExpandedArticles((prev) => {
      const next = new Set(prev)
      if (next.has(articleId)) {
        next.delete(articleId)
      } else {
        next.add(articleId)
      }
      return next
    })
  }

  const toggleSearchResultExpanded = (chunkId: string) => {
    setExpandedSearchResults((prev) => {
      const next = new Set(prev)
      if (next.has(chunkId)) {
        next.delete(chunkId)
      } else {
        next.add(chunkId)
      }
      return next
    })
  }

  const toggleArticleSelection = (articleId: string) => {
    setSelectedArticles((prev) => {
      const next = new Set(prev)
      if (next.has(articleId)) {
        next.delete(articleId)
      } else {
        next.add(articleId)
      }
      return next
    })
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    try {
      const results = await infactory.search(searchQuery, { top_k: 10 })
      setSearchResults(results)
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setIsSearching(false)
    }
  }

  if (!topic) {
    return (
      <PageLayout userRole="teacher" showBackLink backTo="/teacher">
        <div className="card text-center py-12">
          <p className="text-atlantic-stone">Topic not found.</p>
        </div>
      </PageLayout>
    )
  }

  const handleSelectSuggestion = (index: number) => {
    setSelectedAssignment(index)
    setAssignmentPrompt(topic.suggestedAssignments[index])
  }

  const handleLaunchClassroom = () => {
    if (!topic || !assignmentPrompt.trim()) return

    const classroom = createClassroom({
      topicId: topic.id,
      title: topic.title,
      assignmentPrompt: assignmentPrompt.trim(),
      dateRange: topic.dateRange,
      citationStyle,
      customArticles: selectedArticles.size > 0 ? Array.from(selectedArticles) : undefined,
    })

    // Reset demo mode to day1 for fresh classrooms
    setDemoMode('day1')

    setCreatedClassroom(classroom)
    setShowSuccessModal(true)
  }

  const handleCopyCode = () => {
    if (createdClassroom) {
      navigator.clipboard.writeText(createdClassroom.shareCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleViewClassroom = () => {
    if (createdClassroom) {
      navigate(`/teacher/review/${createdClassroom.id}`)
    }
  }

  return (
    <PageLayout
      title={topic.title}
      subtitle="Configure your classroom"
      userRole="teacher"
      showBackLink
      backTo="/teacher"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Topic Details */}
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-4">
              Topic Overview
            </h3>
            <p className="text-atlantic-slate mb-4">{topic.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-atlantic-stone">Date Range:</span>
                <span className="text-atlantic-charcoal">
                  {topic.dateRange.start}–{topic.dateRange.end}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-atlantic-stone">Articles:</span>
                <span className="text-atlantic-charcoal">{topic.articleCount}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-4">
              Sample Sources
            </h3>
            <div className="space-y-3">
              {topic.sampleArticles.map((article, i) => (
                <div key={i} className="text-sm border-l-2 border-atlantic-gold pl-3">
                  <div className="font-medium text-atlantic-charcoal">
                    {article.title}
                  </div>
                  <div className="text-atlantic-stone">
                    {article.author}, {article.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Configuration */}
        <div className="lg:col-span-2">
          {/* Assignment Prompt */}
          <div className="card mb-6">
            <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-4">
              Assignment Prompt
            </h3>
            <p className="text-atlantic-stone text-sm mb-4">
              What should students create using these sources? This prompt will
              guide their research and writing.
            </p>

            <div className="mb-4">
              <label className="label">Suggested Assignments</label>
              <div className="space-y-2">
                {topic.suggestedAssignments.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSuggestion(i)}
                    className={`w-full text-left p-3 rounded border transition-all ${
                      selectedAssignment === i
                        ? 'border-atlantic-gold bg-atlantic-gold/5'
                        : 'border-atlantic-pearl hover:border-atlantic-gold/50'
                    }`}
                  >
                    <span className="text-sm text-atlantic-slate">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Custom Assignment (or edit above)</label>
              <textarea
                value={assignmentPrompt}
                onChange={(e) => setAssignmentPrompt(e.target.value)}
                className="input min-h-[120px] resize-y"
                placeholder="Describe the assignment for your students..."
              />
            </div>
          </div>

          {/* Scope Configuration */}
          <div className="card mb-6">
            <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-4">
              Scope Configuration
            </h3>
            <p className="text-atlantic-stone text-sm mb-4">
              Optionally narrow the available sources for this classroom.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Start Year</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={topic.dateRange.start}
                />
              </div>
              <div>
                <label className="label">End Year</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={topic.dateRange.end}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="label">Exclude Keywords (optional)</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., vietnam, assassination"
              />
              <p className="text-atlantic-stone text-xs mt-1">
                Comma-separated list of topics to exclude from student view
              </p>
            </div>
          </div>

          {/* Citation Style Configuration */}
          <div className="card mb-6">
            <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-4">
              Citation Format
            </h3>
            <p className="text-atlantic-stone text-sm mb-4">
              Select the citation style students will use when citing sources in their essays.
            </p>

            <div className="space-y-3">
              {CITATION_STYLES.map((style) => (
                <label
                  key={style.value}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    citationStyle === style.value
                      ? 'border-atlantic-gold bg-atlantic-gold/5'
                      : 'border-atlantic-pearl hover:border-atlantic-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="citationStyle"
                    value={style.value}
                    checked={citationStyle === style.value}
                    onChange={(e) => setCitationStyle(e.target.value as CitationStyle)}
                    className="mt-1 text-atlantic-gold focus:ring-atlantic-gold"
                  />
                  <div>
                    <span className="font-medium text-atlantic-charcoal">{style.label}</span>
                    <p className="text-atlantic-stone text-sm mt-0.5">{style.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Articles Preview Section */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal">
                Articles Students Will See
              </h3>
              <span className="text-sm text-atlantic-stone bg-atlantic-pearl/50 px-3 py-1 rounded-full">
                {articles.length} articles included
              </span>
            </div>
            <p className="text-atlantic-stone text-sm mb-4">
              Review the articles below to ensure they align with your teaching goals. Click on any article to read its full content.
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {articles.map((article) => {
                const isExpanded = expandedArticles.has(article.article_id)
                return (
                  <div
                    key={article.article_id}
                    className="border border-atlantic-pearl rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleArticleExpanded(article.article_id)}
                      className="w-full text-left p-4 hover:bg-atlantic-pearl/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-atlantic-charcoal mb-1 line-clamp-1">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-atlantic-stone">
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{article.published_at.split('-')[0]}</span>
                            <span>•</span>
                            <span className="capitalize">{article.section}</span>
                          </div>
                          {!isExpanded && (
                            <p className="text-sm text-atlantic-slate mt-2 line-clamp-2">
                              {article.excerpt}
                            </p>
                          )}
                        </div>
                        <svg
                          className={`w-5 h-5 text-atlantic-stone flex-shrink-0 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-atlantic-pearl/50">
                        <div className="pt-4 text-sm text-atlantic-slate leading-relaxed whitespace-pre-line">
                          {article.fullContent || article.excerpt}
                        </div>
                        <div className="mt-3 pt-3 border-t border-atlantic-pearl/50 flex items-center gap-4 text-xs text-atlantic-stone">
                          <span>Topic: {article.topic}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Article Search Section */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal">
                Search for Additional Articles
              </h3>
              {selectedArticles.size > 0 && (
                <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  {selectedArticles.size} article{selectedArticles.size !== 1 ? 's' : ''} added
                </span>
              )}
            </div>
            <p className="text-atlantic-stone text-sm mb-4">
              Search The Atlantic archive to find additional articles to include in your classroom.
            </p>

            {/* Search Input */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="input flex-1"
                placeholder="Search The Atlantic archive..."
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="btn btn-secondary"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 ? (
              <div className="border border-atlantic-pearl rounded-lg overflow-hidden">
                <div className="bg-atlantic-pearl/50 px-4 py-2">
                  <span className="text-sm text-atlantic-stone">
                    {searchResults.length} results found
                  </span>
                </div>
                <div className="space-y-0 max-h-[400px] overflow-y-auto divide-y divide-atlantic-pearl">
                  {searchResults.map((result) => {
                    const isExpanded = expandedSearchResults.has(result.chunk.chunk_id)
                    const isSelected = selectedArticles.has(result.chunk.chunk_id)
                    return (
                      <div
                        key={result.chunk.chunk_id}
                        className={`bg-white ${isSelected ? 'ring-2 ring-green-500 ring-inset' : ''}`}
                      >
                        <div className="flex items-start p-4">
                          <button
                            onClick={() => toggleSearchResultExpanded(result.chunk.chunk_id)}
                            className="flex-1 text-left hover:bg-atlantic-pearl/20 transition-colors -m-4 p-4 pr-2"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-atlantic-charcoal line-clamp-1">
                                    {result.chunk.title}
                                  </h4>
                                  {isSelected && (
                                    <svg
                                      className="w-4 h-4 text-green-600 flex-shrink-0"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-atlantic-stone">
                                  <span>{result.chunk.author}</span>
                                  <span>•</span>
                                  <span>{result.chunk.published_at?.split('-')[0] || 'N/A'}</span>
                                  <span>•</span>
                                  <span className="capitalize">{result.chunk.section}</span>
                                </div>
                                {!isExpanded && (
                                  <p className="text-sm text-atlantic-slate mt-2 line-clamp-2">
                                    {result.chunk.excerpt}
                                  </p>
                                )}
                              </div>
                              <svg
                                className={`w-5 h-5 text-atlantic-stone flex-shrink-0 transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleArticleSelection(result.chunk.chunk_id)
                            }}
                            className={`ml-3 px-3 py-1.5 rounded text-sm font-medium transition-colors flex-shrink-0 ${
                              isSelected
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {isSelected ? 'Remove' : 'Add +'}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-atlantic-pearl/50">
                            <div className="pt-4 text-sm text-atlantic-slate leading-relaxed whitespace-pre-line">
                              {result.chunk.excerpt}
                            </div>
                            <div className="mt-3 pt-3 border-t border-atlantic-pearl/50 flex items-center gap-4 text-xs text-atlantic-stone">
                              <span>Topic: {result.chunk.topic}</span>
                              <span>Score: {result.score.toFixed(3)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-atlantic-stone border border-atlantic-pearl rounded-lg bg-atlantic-pearl/20">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-atlantic-stone/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p>Search to find additional articles to include</p>
              </div>
            )}
          </div>

          {/* Launch Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/teacher')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleLaunchClassroom}
              className="btn btn-primary"
              disabled={!assignmentPrompt.trim()}
            >
              Launch Classroom
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && createdClassroom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-atlantic-charcoal mb-2">
                Classroom Launched!
              </h2>
              <p className="text-atlantic-slate">
                Share this code with your students to join the classroom.
              </p>
            </div>

            {/* Share Code Display */}
            <div className="bg-atlantic-pearl/30 rounded-lg p-4 mb-6">
              <label className="block text-sm text-atlantic-stone mb-2 text-center">
                Share Code
              </label>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-bold text-atlantic-charcoal tracking-wider">
                  {createdClassroom.shareCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 text-atlantic-slate hover:text-atlantic-gold transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-center text-sm text-green-600 mt-2">
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* Classroom Info */}
            <div className="border-t border-atlantic-pearl pt-4 mb-6">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-atlantic-stone">Topic:</span>
                  <span className="text-atlantic-charcoal font-medium">
                    {createdClassroom.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-atlantic-stone">Created:</span>
                  <span className="text-atlantic-charcoal">
                    {new Date(createdClassroom.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/teacher')}
                className="btn btn-secondary flex-1"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleViewClassroom}
                className="btn btn-primary flex-1"
              >
                View Classroom
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
