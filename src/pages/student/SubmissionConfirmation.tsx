import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppStore } from '../../lib/stores/app-store'
import { countWordsInHtml } from '../../components/RichTextEditor'

export function SubmissionConfirmation() {
  const { classroomId } = useParams()

  // Get store data
  const { getClassroomById, getSubmittedEssays, highlights } = useAppStore()

  // Get classroom and submitted essay data
  const classroom = classroomId ? getClassroomById(classroomId) : null

  // Get the most recent submitted essay for this classroom
  const submittedEssay = useMemo(() => {
    const essays = getSubmittedEssays(classroomId)
    return essays.length > 0 ? essays[essays.length - 1] : null
  }, [classroomId, getSubmittedEssays])

  // Calculate stats
  const wordCount = submittedEssay ? countWordsInHtml(submittedEssay.htmlContent) : 0
  const citationCount = new Set(highlights.map((h) => h.articleId)).size

  // Format submission time
  const submissionTime = submittedEssay
    ? new Date(submittedEssay.submittedAt).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : ''

  return (
    <div className="min-h-screen bg-atlantic-cream flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white rounded-lg border border-atlantic-pearl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
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

          {/* Congratulations Message */}
          <h1 className="font-serif text-2xl font-bold text-atlantic-charcoal mb-2">
            Congratulations!
          </h1>
          <p className="text-atlantic-slate text-lg mb-6">
            Your essay has been submitted successfully.
          </p>

          {/* Submission Summary */}
          <div className="bg-atlantic-cream rounded-lg p-6 mb-6">
            <h2 className="font-medium text-atlantic-charcoal mb-4 text-left">
              Submission Summary
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center py-2 border-b border-atlantic-pearl">
                <span className="text-atlantic-stone">Assignment</span>
                <span className="text-atlantic-charcoal font-medium text-right max-w-[200px] truncate">
                  {classroom?.title || 'Research Essay'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-atlantic-pearl">
                <span className="text-atlantic-stone">Word Count</span>
                <span className="text-atlantic-charcoal font-medium">
                  {wordCount.toLocaleString()} words
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-atlantic-pearl">
                <span className="text-atlantic-stone">Sources Cited</span>
                <span className="text-atlantic-charcoal font-medium">
                  {citationCount} {citationCount === 1 ? 'source' : 'sources'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-atlantic-stone">Submitted</span>
                <span className="text-atlantic-charcoal font-medium text-sm text-right">
                  {submissionTime}
                </span>
              </div>
            </div>
          </div>

          {/* Teacher Notification */}
          <div className="flex items-center justify-center gap-2 text-atlantic-slate mb-8">
            <svg
              className="w-5 h-5 text-atlantic-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-sm">Your teacher has been notified</span>
          </div>

          {/* Action Button */}
          <Link
            to="/student"
            className="btn btn-primary inline-flex items-center gap-2"
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return to Dashboard
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center text-atlantic-stone text-sm mt-6">
          You can view your submission history from your student dashboard.
        </p>
      </div>
    </div>
  )
}
