import { useState, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../lib/stores/app-store'
import { CLIMATE_CHANGE_ARTICLES, type CuratedArticle } from '../../data/climate-change-articles'
import { AI_ARTICLES } from '../../data/ai-articles'
import {
  validateCitation,
  CITATION_FORMAT_EXAMPLES,
  CITATION_FORMAT_DESCRIPTIONS,
  type CitationValidation,
  type ArticleMetadata,
} from '../../lib/services/citation-validator'
import type { CitationStyle } from '../../lib/stores/app-store'

// Map topic IDs to article sets for lookup
const TOPIC_ARTICLES: Record<string, CuratedArticle[]> = {
  'climate-change': CLIMATE_CHANGE_ARTICLES,
  'artificial-intelligence': AI_ARTICLES,
  'technology-society': AI_ARTICLES,
}

// Get article metadata by chunk_id
function getArticleByChunkId(topicId: string, chunkId: string): CuratedArticle | undefined {
  const articles = TOPIC_ARTICLES[topicId] || []
  return articles.find((a) => a.chunk_id === chunkId)
}

// Convert CuratedArticle to ArticleMetadata
function toArticleMetadata(article: CuratedArticle): ArticleMetadata {
  return {
    title: article.title,
    author: article.author,
    publishedAt: article.published_at,
    section: article.section,
  }
}

// Citation status indicator component
function CitationStatus({ validation }: { validation: CitationValidation | null }) {
  if (!validation) {
    return (
      <span className="inline-flex items-center gap-1 text-atlantic-stone text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
        </svg>
        Not validated
      </span>
    )
  }

  if (validation.isValid) {
    return (
      <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
        Valid citation
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      Needs revision
    </span>
  )
}

export function CitationReview() {
  const { classroomId } = useParams()
  const navigate = useNavigate()

  // Get store data
  const {
    highlights,
    essay,
    getClassroomById,
    studentCitations,
    setArticleCitation,
    submitEssay,
    clearCitations,
  } = useAppStore()

  // Get classroom data
  const classroom = classroomId ? getClassroomById(classroomId) : null
  const topicId = classroom?.topicId || classroomId || 'climate-change'
  const citationStyle: CitationStyle = classroom?.citationStyle || 'mla'

  // Get unique articles that the student has interacted with (highlighted)
  const citedArticles = useMemo(() => {
    const articleIds = new Set(highlights.map((h) => h.articleId))
    const articles: CuratedArticle[] = []

    for (const id of articleIds) {
      const article = getArticleByChunkId(topicId, id)
      if (article) {
        articles.push(article)
      }
    }

    return articles
  }, [highlights, topicId])

  // Validation state for each article
  const [validations, setValidations] = useState<Record<string, CitationValidation>>({})
  const [isValidating, setIsValidating] = useState(false)
  const [hasValidated, setHasValidated] = useState(false)

  // Check if all citations are valid
  const allCitationsValid = useMemo(() => {
    if (!hasValidated) return false
    if (citedArticles.length === 0) return false

    return citedArticles.every((article) => {
      const validation = validations[article.chunk_id]
      return validation?.isValid === true
    })
  }, [validations, citedArticles, hasValidated])

  // Handle citation text change
  const handleCitationChange = (articleId: string, citation: string) => {
    setArticleCitation(articleId, citation)
    // Clear validation when citation changes
    setValidations((prev) => {
      const next = { ...prev }
      delete next[articleId]
      return next
    })
    setHasValidated(false)
  }

  // Validate all citations
  const handleValidateAll = () => {
    setIsValidating(true)

    // Simulate a slight delay for UX
    setTimeout(() => {
      const newValidations: Record<string, CitationValidation> = {}

      for (const article of citedArticles) {
        const citation = studentCitations[article.chunk_id] || ''
        const metadata = toArticleMetadata(article)
        const result = validateCitation(metadata, citation, citationStyle)
        newValidations[article.chunk_id] = result
      }

      setValidations(newValidations)
      setHasValidated(true)
      setIsValidating(false)
    }, 500)
  }

  // Handle final submission
  const handleSubmit = () => {
    if (!classroomId) return

    // Submit the essay
    submitEssay(classroomId, essay)

    // Clear citations for next assignment
    clearCitations()

    // Navigate to confirmation page
    navigate(`/student/classroom/${classroomId}/submitted`)
  }

  // Format style name for display
  const formatStyleName = (style: CitationStyle): string => {
    switch (style) {
      case 'mla':
        return 'MLA (Modern Language Association)'
      case 'apa':
        return 'APA (American Psychological Association)'
      case 'chicago':
        return 'Chicago Manual of Style'
    }
  }

  return (
    <div className="min-h-screen bg-atlantic-cream">
      {/* Header */}
      <header className="bg-atlantic-charcoal text-white py-3 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/student/classroom/${classroomId}/write`}
              className="text-atlantic-silver hover:text-white"
            >
              ← Back to Writing
            </Link>
            <div>
              <h1 className="font-serif text-xl font-semibold">Citation Review</h1>
              <p className="text-atlantic-silver text-sm">
                Verify your citations before submitting
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-6">
        {/* Citation Format Reference Card */}
        <div className="bg-white rounded-lg border border-atlantic-pearl p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-atlantic-gold/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-atlantic-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-2">
                Required Format: {formatStyleName(citationStyle)}
              </h2>
              <div className="bg-atlantic-cream rounded-lg p-4 mb-4 font-mono text-sm text-atlantic-charcoal">
                {CITATION_FORMAT_EXAMPLES[citationStyle]}
              </div>
              <div className="text-sm text-atlantic-slate">
                <p className="font-medium mb-2">Format requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  {CITATION_FORMAT_DESCRIPTIONS[citationStyle].map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* No citations message */}
        {citedArticles.length === 0 && (
          <div className="bg-white rounded-lg border border-atlantic-pearl p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-atlantic-stone mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-2">
              No Sources to Cite
            </h3>
            <p className="text-atlantic-slate mb-4">
              You haven't highlighted any passages from the articles yet. Return to the
              research workspace to highlight text from sources you want to cite.
            </p>
            <Link
              to={`/student/classroom/${classroomId}`}
              className="btn btn-secondary inline-block"
            >
              Return to Research
            </Link>
          </div>
        )}

        {/* Citation Cards */}
        {citedArticles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-atlantic-charcoal">
                Your Sources ({citedArticles.length})
              </h2>
              <span className="text-sm text-atlantic-stone">
                {Object.values(validations).filter((v) => v.isValid).length} of{' '}
                {citedArticles.length} citations valid
              </span>
            </div>

            {citedArticles.map((article) => {
              const validation = validations[article.chunk_id]
              const currentCitation = studentCitations[article.chunk_id] || ''

              return (
                <div
                  key={article.chunk_id}
                  className={`bg-white rounded-lg border p-6 transition-all ${
                    validation?.isValid
                      ? 'border-green-300 bg-green-50/30'
                      : validation
                        ? 'border-amber-300 bg-amber-50/30'
                        : 'border-atlantic-pearl'
                  }`}
                >
                  {/* Article Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-1">
                        {article.title}
                      </h3>
                      <p className="text-atlantic-slate text-sm">
                        {article.author} | {article.section} |{' '}
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <CitationStatus validation={validation} />
                  </div>

                  {/* Citation Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-atlantic-charcoal mb-2">
                      Your Citation
                    </label>
                    <textarea
                      value={currentCitation}
                      onChange={(e) =>
                        handleCitationChange(article.chunk_id, e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 transition-colors ${
                        validation?.isValid
                          ? 'border-green-300 focus:ring-green-200'
                          : validation
                            ? 'border-amber-300 focus:ring-amber-200'
                            : 'border-atlantic-pearl focus:ring-atlantic-gold/30'
                      }`}
                      rows={3}
                      placeholder={`Enter your ${citationStyle.toUpperCase()} citation for this article...`}
                    />
                  </div>

                  {/* Validation Hints */}
                  {validation && !validation.isValid && validation.hints.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-amber-800 mb-2">
                        Suggestions for improvement:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {validation.hints.map((hint, i) => (
                          <li key={i} className="text-sm text-amber-700">
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Valid message */}
                  {validation?.isValid && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        This citation meets the {citationStyle.toUpperCase()} format
                        requirements.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Action Buttons */}
        {citedArticles.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-atlantic-pearl pt-8">
            <Link
              to={`/student/classroom/${classroomId}/write`}
              className="btn btn-secondary"
            >
              Back to Writing
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={handleValidateAll}
                disabled={isValidating}
                className="btn btn-secondary"
              >
                {isValidating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Validating...
                  </>
                ) : (
                  'Validate Citations'
                )}
              </button>

              <button
                onClick={handleSubmit}
                className={`btn ${
                  allCitationsValid
                    ? 'btn-primary'
                    : 'btn-primary bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {allCitationsValid ? 'Submit Essay' : 'Submit Anyway (Demo Mode)'}
              </button>
            </div>
          </div>
        )}

        {/* Submission Requirements Notice */}
        {citedArticles.length > 0 && !allCitationsValid && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-amber-700">
                {hasValidated
                  ? 'Some citations need revision. You can still submit for demo purposes.'
                  : 'Citations not validated. You can still submit for demo purposes.'}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
