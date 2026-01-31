import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PageLayout } from '../../components/layout/PageLayout'
import { useAppStore } from '../../lib/stores/app-store'
import { infactory, type SearchResult } from '../../lib/api/infactory'
import { CLIMATE_CHANGE_ARTICLES, type CuratedArticle } from '../../data/climate-change-articles'
import { AI_ARTICLES } from '../../data/ai-articles'

// Combine all suggested articles for the demo
const SUGGESTED_ARTICLES: CuratedArticle[] = [...CLIMATE_CHANGE_ARTICLES, ...AI_ARTICLES]

export function ClassroomCustomize() {
  const { classroomId } = useParams()
  const navigate = useNavigate()
  const {
    getClassroomById,
    updateClassroomAssignment,
    addArticleToClassroom,
    removeArticleFromClassroom,
  } = useAppStore()

  // Get classroom data
  const classroom = classroomId ? getClassroomById(classroomId) : null

  // Local state for form inputs
  const [assignmentPrompt, setAssignmentPrompt] = useState(classroom?.assignmentPrompt || '')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  if (!classroom) {
    return (
      <PageLayout
        title="Classroom Not Found"
        userRole="teacher"
        showBackLink
        backTo="/teacher"
      >
        <div className="card text-center py-12">
          <p className="text-atlantic-slate mb-4">Could not find the classroom.</p>
          <Link to="/teacher" className="btn btn-secondary">
            Return to Dashboard
          </Link>
        </div>
      </PageLayout>
    )
  }

  // Handle assignment prompt save
  const handleSaveAssignment = () => {
    if (classroomId) {
      updateClassroomAssignment(classroomId, assignmentPrompt)
      setSaveMessage('Assignment saved!')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  // Handle article search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)
    try {
      const results = await infactory.search(searchQuery, { top_k: 10 })
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle adding an article (from search results or suggestions)
  const handleAddArticle = (articleId: string) => {
    if (classroomId) {
      addArticleToClassroom(classroomId, articleId)
    }
  }

  // Handle removing an article
  const handleRemoveArticle = (articleId: string) => {
    if (classroomId) {
      removeArticleFromClassroom(classroomId, articleId)
    }
  }

  // Check if an article is already in the classroom
  const isArticleInClassroom = (articleId: string) => {
    return (classroom.customArticles || []).includes(articleId)
  }

  // Clear search and show suggestions again
  const handleClearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setHasSearched(false)
  }

  return (
    <PageLayout
      title="Customize Classroom"
      subtitle={classroom.title}
      userRole="teacher"
      showBackLink
      backTo={`/teacher/review/${classroomId}`}
    >
      {/* Save Message */}
      {saveMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {saveMessage}
        </div>
      )}

      {/* Section 1: Edit Assignment Prompt */}
      <section className="card mb-8">
        <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-4">
          Assignment Prompt
        </h3>
        <p className="text-atlantic-slate text-sm mb-4">
          Edit the main assignment that students will see when they enter your classroom.
        </p>
        <textarea
          value={assignmentPrompt}
          onChange={(e) => setAssignmentPrompt(e.target.value)}
          className="input-field w-full h-32 resize-y"
          placeholder="Enter the assignment prompt for students..."
        />
        <div className="mt-4 flex justify-end">
          <button onClick={handleSaveAssignment} className="btn btn-primary">
            Save Assignment
          </button>
        </div>
      </section>

      {/* Section 2: Manage Articles */}
      <section className="card mb-8">
        <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-4">
          Manage Articles
        </h3>

        {/* Current Articles */}
        <div className="mb-6">
          <h4 className="font-medium text-atlantic-charcoal mb-3">Current Articles</h4>
          {(classroom.customArticles || []).length === 0 ? (
            <p className="text-atlantic-stone text-sm italic">
              No custom articles added yet. Search below to add articles to your classroom.
            </p>
          ) : (
            <ul className="space-y-2">
              {(classroom.customArticles || []).map((articleId) => {
                // Try to find title from suggested articles
                const suggestedArticle = SUGGESTED_ARTICLES.find(a => a.chunk_id === articleId)
                return (
                  <li
                    key={articleId}
                    className="flex items-center justify-between p-3 bg-atlantic-cream rounded"
                  >
                    <div className="flex-1 min-w-0">
                      {suggestedArticle ? (
                        <>
                          <span className="font-medium text-atlantic-charcoal truncate block">
                            {suggestedArticle.title}
                          </span>
                          <span className="text-sm text-atlantic-stone">
                            {suggestedArticle.author}
                          </span>
                        </>
                      ) : (
                        <span className="font-mono text-sm text-atlantic-slate">{articleId}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveArticle(articleId)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex-shrink-0 ml-4"
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Search for Articles */}
        <div>
          <h4 className="font-medium text-atlantic-charcoal mb-3">Search for Articles</h4>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="input-field flex-1"
              placeholder="Search The Atlantic archive..."
            />
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="btn btn-secondary"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            {hasSearched && (
              <button
                onClick={handleClearSearch}
                className="btn btn-secondary"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="border border-atlantic-pearl rounded-lg overflow-hidden">
              <div className="bg-atlantic-pearl/50 px-4 py-2">
                <span className="text-sm text-atlantic-stone">
                  {searchResults.length} results found
                </span>
              </div>
              <ul className="divide-y divide-atlantic-pearl max-h-96 overflow-y-auto">
                {searchResults.map((result) => {
                  const articleId = result.chunk.chunk_id
                  const inClassroom = isArticleInClassroom(articleId)

                  return (
                    <li
                      key={result.chunk.chunk_id}
                      className="p-4 hover:bg-atlantic-cream/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-atlantic-charcoal truncate">
                            {result.chunk.title}
                          </h5>
                          <p className="text-sm text-atlantic-stone">
                            {result.chunk.author} | {result.chunk.section}
                          </p>
                          <p className="text-sm text-atlantic-slate mt-1 line-clamp-2">
                            {result.chunk.excerpt}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            inClassroom
                              ? handleRemoveArticle(articleId)
                              : handleAddArticle(articleId)
                          }
                          className={`flex-shrink-0 px-3 py-1 text-sm font-medium rounded ${
                            inClassroom
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-atlantic-gold/10 text-atlantic-gold hover:bg-atlantic-gold/20'
                          }`}
                        >
                          {inClassroom ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* No results message */}
          {hasSearched && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-6 text-atlantic-stone">
              No results found for "{searchQuery}". Try a different search term or browse the suggested articles below.
            </div>
          )}

          {/* Suggested Articles - shown when search is empty or no results */}
          {!hasSearched && (
            <div className="mt-6">
              <h4 className="font-medium text-atlantic-charcoal mb-3">Suggested Articles</h4>
              <p className="text-atlantic-stone text-sm mb-4">
                Curated articles from The Atlantic archive covering climate change and artificial intelligence.
              </p>
              <div className="border border-atlantic-pearl rounded-lg overflow-hidden">
                <ul className="divide-y divide-atlantic-pearl max-h-96 overflow-y-auto">
                  {SUGGESTED_ARTICLES.map((article) => {
                    const inClassroom = isArticleInClassroom(article.chunk_id)

                    return (
                      <li
                        key={article.chunk_id}
                        className="p-4 hover:bg-atlantic-cream/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-atlantic-charcoal truncate">
                              {article.title}
                            </h5>
                            <p className="text-sm text-atlantic-stone">
                              {article.author} | {article.section}
                            </p>
                            <p className="text-xs text-atlantic-stone mt-1">
                              {article.topic} - {article.published_at}
                            </p>
                            <p className="text-sm text-atlantic-slate mt-1 line-clamp-2">
                              {article.excerpt}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              inClassroom
                                ? handleRemoveArticle(article.chunk_id)
                                : handleAddArticle(article.chunk_id)
                            }
                            className={`flex-shrink-0 px-3 py-1 text-sm font-medium rounded ${
                              inClassroom
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-atlantic-gold/10 text-atlantic-gold hover:bg-atlantic-gold/20'
                            }`}
                          >
                            {inClassroom ? 'Remove' : 'Add'}
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-atlantic-pearl">
        <button
          onClick={() => navigate(`/teacher/review/${classroomId}`)}
          className="btn btn-secondary"
        >
          Back to Review
        </button>
        <button
          onClick={() => {
            handleSaveAssignment()
            navigate(`/teacher/review/${classroomId}`)
          }}
          className="btn btn-primary"
        >
          Save All Changes
        </button>
      </div>
    </PageLayout>
  )
}
