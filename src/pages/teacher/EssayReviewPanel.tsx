// Essay Review Panel (bd-7k8)
// Page for teachers to review submitted student essays

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageLayout } from '../../components/layout/PageLayout'
import { useAppStore, SubmittedEssay } from '../../lib/stores/app-store'
import { exportAsText, exportAsDocx } from '../../lib/utils/essay-export'

// Mock submitted essays for Day 30 demo
const MOCK_SUBMITTED_ESSAYS: SubmittedEssay[] = [
  {
    id: 'essay-1',
    classroomId: 'climate-change',
    studentId: '3',
    studentName: 'Taylor Williams',
    htmlContent: `<h1>The Climate Reckoning: Why We Knew But Didn't Act</h1>

<p>For decades, the scientific community has sounded the alarm on climate change, yet meaningful action remains elusive. As The Atlantic's coverage reveals, this isn't a failure of knowledge—it's a failure of collective will, complicated by deliberate misinformation campaigns and policy paralysis.</p>

<p>The evidence has been clear since at least the 1980s. When NASA's top climate scientists testified before Congress in 1988 that global warming had already begun, the electricity industry didn't respond with innovation—they responded with denial. The Edison Electric Institute helped establish the Global Climate Coalition, one of the most notorious advocates of climate skepticism. This wasn't ignorance; it was <strong>strategic obstruction</strong>. The same playbook had worked for tobacco companies, and it worked for fossil fuel interests too.</p>

<p>Today, we face the consequences of those lost decades. The 1.5 degree Celsius target that scientists once considered our safe limit is now, as one Atlantic article bluntly states, "all but dead." Even with every nation's current emission reduction plans fully implemented, we're still headed for <em>nearly 3 degrees of warming by 2100</em>. The question is no longer whether we can prevent climate change—it's whether we can adapt quickly enough to survive its worst effects.</p>

<h2>The Paradox of Environmental Protection</h2>

<p>What strikes me most is the cruel irony now facing environmentalists: the very laws designed to protect nature—like NEPA—have become obstacles to building the green infrastructure we desperately need. Solar farms, wind turbines, high-speed rail—all face the same bureaucratic hurdles that were designed to stop polluting factories. As one Atlantic writer put it, "In the era of global warming, preserving nature requires building new infrastructure."</p>

<p>This tension between preservation and progress defines our current moment. The old environmental movement focused on stopping things—stopping development, stopping pollution, stopping growth. But climate action now <strong>requires</strong> building things at an unprecedented scale. We need to build solar farms across thousands of acres, wind turbines off our coastlines, and dense housing in cities where people can live without cars.</p>

<h2>Case Study: The Galápagos Exception</h2>

<p>Not every ecosystem is succumbing to warming temperatures. A cold spot near the Galápagos Islands has been fending off climate change, sustaining populations of penguins, marine iguanas, sea lions, and cetaceans that wouldn't survive on the equator otherwise. This natural refuge offers a rare success story—and perhaps a model for targeted conservation efforts.</p>

<p>But we cannot rely on geographic luck. Most species don't have a cold spot to retreat to. Most coastal communities can't pick up and move. The Galápagos exception proves the rule: without systemic change, isolated refugia cannot save us.</p>

<h2>The Path Forward</h2>

<p>So what can be done? The Atlantic's coverage suggests several avenues:</p>

<p>First, we must <strong>acknowledge the reality of adaptation</strong>. Mitigation alone is no longer sufficient. We need sea walls, drought-resistant crops, and heat-resilient infrastructure. This isn't giving up on reducing emissions—it's accepting that some warming is already locked in.</p>

<p>Second, we need <strong>regulatory reform</strong>. Environmental laws must be updated to distinguish between harmful development and necessary climate infrastructure. Building a solar farm is not the same as building a coal plant, and our permitting processes should reflect that.</p>

<p>Third, we require <strong>honest communication</strong> about the costs of inaction. For too long, industry interests have muddied the waters with denial and delay. Scientists must speak plainly about what we face, even when the news is grim.</p>

<h2>Conclusion</h2>

<p>The story of climate change is ultimately a story about human choices. We chose to listen to industry over scientists. We chose short-term profits over long-term survival. We chose to deny what was uncomfortable rather than act on what was true.</p>

<p>But we can make different choices now. The Atlantic's reporting shows that the path forward exists—it's just harder than it would have been thirty years ago. We've lost the option of easy solutions. What remains is the harder work of adaptation, infrastructure, and finally accepting the truth that we've known all along: <em>the climate is changing, we caused it, and only we can respond.</em></p>`,
    submittedAt: '2026-01-28T16:45:00Z',
  },
]

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function generateFilename(studentName: string, classroomId: string): string {
  const safeName = studentName.toLowerCase().replace(/\s+/g, '-')
  const safeClassroom = classroomId.replace(/\s+/g, '-')
  const date = new Date().toISOString().split('T')[0]
  return `${safeName}-${safeClassroom}-${date}`
}

export function EssayReviewPanel() {
  const { classroomId } = useParams()
  const { demoMode, getClassroomById, getSubmittedEssays } = useAppStore()
  const [expandedEssayId, setExpandedEssayId] = useState<string | null>(null)
  const [exportingId, setExportingId] = useState<string | null>(null)

  const classroom = classroomId ? getClassroomById(classroomId) : null

  // Get submitted essays from store, or use mock data for Day 30 demo
  const storeEssays = getSubmittedEssays(classroomId)
  // In Day 30 demo mode, show mock essays if:
  // 1. The classroom's topicId matches the essay's classroomId (e.g., both are 'climate-change')
  // 2. OR the classroom URL is exactly 'climate-change' (legacy/demo route)
  const essays = demoMode === 'day30' && storeEssays.length === 0
    ? MOCK_SUBMITTED_ESSAYS.filter((e) => e.classroomId === classroom?.topicId || classroomId === 'climate-change')
    : storeEssays

  const handleExportTxt = (essay: SubmittedEssay) => {
    const filename = generateFilename(essay.studentName, classroomId || 'essay')
    exportAsText(essay.htmlContent, filename)
  }

  const handleExportDocx = async (essay: SubmittedEssay) => {
    setExportingId(essay.id)
    try {
      const filename = generateFilename(essay.studentName, classroomId || 'essay')
      await exportAsDocx(essay.htmlContent, filename)
    } finally {
      setExportingId(null)
    }
  }

  const toggleExpanded = (essayId: string) => {
    setExpandedEssayId(expandedEssayId === essayId ? null : essayId)
  }

  return (
    <PageLayout
      title="Review Submitted Essays"
      subtitle={classroom?.title || 'Classroom Essays'}
      userRole="teacher"
      showBackLink
      backTo={`/teacher/review/${classroomId}`}
    >
      {/* Summary */}
      <div className="summary-card mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-2">
              <span className="text-atlantic-gold">&#10022;</span> Assignment
            </h3>
            <p className="text-atlantic-slate">{classroom?.assignmentPrompt || 'No assignment set'}</p>
          </div>
          <div className="text-right">
            <div className="font-serif text-3xl font-bold text-atlantic-charcoal">
              {essays.length}
            </div>
            <div className="text-atlantic-stone text-sm">
              Essay{essays.length !== 1 ? 's' : ''} Submitted
            </div>
          </div>
        </div>
      </div>

      {/* Essays List */}
      {essays.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto mb-4 text-atlantic-stone/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-2">
            No Essays Submitted Yet
          </h3>
          <p className="text-atlantic-stone">
            Essays will appear here when students submit their work.
          </p>
          <Link
            to={`/teacher/review/${classroomId}`}
            className="btn btn-secondary mt-6 inline-block"
          >
            Back to Classroom
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {essays.map((essay) => (
            <div key={essay.id} className="card overflow-hidden">
              {/* Essay Header - Always Visible */}
              <div
                className="flex items-center justify-between cursor-pointer p-4 -m-6 mb-0 hover:bg-atlantic-cream/30 transition-colors"
                onClick={() => toggleExpanded(essay.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-lg ${
                    expandedEssayId === essay.id
                      ? 'bg-atlantic-gold text-white'
                      : 'bg-atlantic-cream text-atlantic-charcoal'
                  }`}>
                    {essay.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal">
                      {essay.studentName}
                    </h3>
                    <p className="text-sm text-atlantic-stone">
                      Submitted {formatDate(essay.submittedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Export Buttons */}
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleExportTxt(essay)}
                      className="btn btn-secondary text-xs px-3 py-1.5"
                      title="Download as plain text"
                    >
                      TXT
                    </button>
                    <button
                      onClick={() => handleExportDocx(essay)}
                      disabled={exportingId === essay.id}
                      className="btn btn-secondary text-xs px-3 py-1.5 disabled:opacity-50"
                      title="Download as Word document"
                    >
                      {exportingId === essay.id ? '...' : 'DOCX'}
                    </button>
                  </div>
                  {/* Expand/Collapse Icon */}
                  <svg
                    className={`w-5 h-5 text-atlantic-stone transition-transform ${
                      expandedEssayId === essay.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Essay Content - Expandable */}
              {expandedEssayId === essay.id && (
                <div className="border-t border-atlantic-pearl mt-4 pt-6">
                  <div
                    className="prose prose-atlantic max-w-none essay-content"
                    dangerouslySetInnerHTML={{ __html: essay.htmlContent }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add prose styles for essay rendering */}
      <style>{`
        .essay-content h1 {
          font-family: var(--font-serif, ui-serif, Georgia, serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .essay-content h2 {
          font-family: var(--font-serif, ui-serif, Georgia, serif);
          font-size: 1.375rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .essay-content h3 {
          font-family: var(--font-serif, ui-serif, Georgia, serif);
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .essay-content p {
          color: #333;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .essay-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        .essay-content em {
          font-style: italic;
        }
        .essay-content blockquote {
          border-left: 4px solid #c9a962;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #555;
        }
      `}</style>
    </PageLayout>
  )
}
