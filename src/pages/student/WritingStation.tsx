import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../lib/stores/app-store'
import {
  SocraticTutor,
  SocraticTriggerButton,
  useSocraticTutor,
} from '../../features/socratic/SocraticTutor'
import { RichTextEditor, countWordsInHtml } from '../../components/RichTextEditor'

// Map topic IDs to titles for display
const TOPIC_TITLES: Record<string, string> = {
  'artificial-intelligence': 'Artificial Intelligence: Promise and Peril',
  'climate-change': 'Climate Change: Science and Society',
  'technology-society': 'Technology and Society',
  'demo-classroom': 'Climate Change: Science and Society',
}

const TOPIC_ASSIGNMENTS: Record<string, string> = {
  'artificial-intelligence': 'Write an essay exploring whether AI represents a greater opportunity or threat to humanity. Use at least 3 sources to support your argument.',
  'climate-change': 'Analyze how climate change coverage in The Atlantic has evolved. What perspectives are represented? What solutions are proposed?',
  'technology-society': 'Examine the relationship between technology and democracy as presented in these articles. What are the key tensions?',
  'demo-classroom': 'Analyze how climate change coverage in The Atlantic has evolved. What perspectives are represented? What solutions are proposed?',
}

export function WritingStation() {
  const { classroomId } = useParams()
  const navigate = useNavigate()

  // Get highlights, notes, and essay from global store
  const { highlights, notes, essay, setEssay, getClassroomById } = useAppStore()

  // Get the actual classroom from store to find its topicId
  // classroomId can be a UUID (from joinClassroom) OR a legacy topicId string
  const classroom = classroomId ? getClassroomById(classroomId) : null

  // Use classroom's topicId if found, otherwise try using classroomId directly as topicId (legacy support)
  const topicId = classroom?.topicId || classroomId || 'climate-change'

  // Count words from HTML content
  const wordCount = countWordsInHtml(essay)
  const topicTitle = TOPIC_TITLES[topicId] || 'Research Workspace'
  const assignment = TOPIC_ASSIGNMENTS[topicId] || 'Complete your research and write an essay based on the sources provided.'

  // Use the Socratic tutor hook for intelligent prompting
  const socratic = useSocraticTutor(wordCount, highlights, essay)

  // Handle essay changes - also record activity for pause detection
  const handleEssayChange = (html: string) => {
    setEssay(html)
    socratic.recordActivity()
  }

  return (
    <div className="h-screen bg-atlantic-cream flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-atlantic-charcoal text-white py-3 px-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/student/classroom/${classroomId}`}
              className="text-atlantic-silver hover:text-white"
            >
              ← Back to Research
            </Link>
            <div>
              <h1 className="font-serif text-xl font-semibold">Writing Station</h1>
              <p className="text-atlantic-silver text-sm">{topicTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-atlantic-silver text-sm">{wordCount} words</span>
            <button className="btn btn-secondary text-sm">Save Draft</button>
            <button
              className="btn btn-primary text-sm"
              onClick={() => navigate(`/student/classroom/${classroomId}/citations`)}
            >
              Review Citations →
            </button>
          </div>
        </div>
      </header>

      {/* Assignment Banner */}
      <div className="bg-atlantic-gold/10 border-b border-atlantic-gold/30 px-6 py-3 flex-shrink-0">
        <span className="text-atlantic-gold font-medium text-sm">Assignment: </span>
        <span className="text-atlantic-charcoal text-sm">
          {assignment}
        </span>
      </div>

      {/* Main Content - Two Panel Layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel - Research Materials */}
        <div className="w-96 border-r border-atlantic-pearl bg-white overflow-y-auto">
          <div className="p-4 border-b border-atlantic-pearl">
            <h2 className="font-serif text-lg font-semibold text-atlantic-charcoal">
              Your Research
            </h2>
            <p className="text-atlantic-stone text-sm mt-1">
              Reference your highlights and notes as you write
            </p>
          </div>

          {/* Highlights */}
          <div className="p-4 border-b border-atlantic-pearl">
            <h3 className="label">Highlights ({highlights.length})</h3>
            {highlights.length > 0 ? (
              <div className="space-y-3">
                {highlights.map((h) => (
                  <div
                    key={h.id}
                    className="bg-atlantic-gold/10 border-l-2 border-atlantic-gold p-3 rounded-r cursor-pointer hover:bg-atlantic-gold/20 transition-colors"
                    onClick={() => socratic.showPrompt('highlight')}
                  >
                    <p className="text-sm text-atlantic-charcoal italic">"{h.text}"</p>
                    {h.articleTitle && (
                      <p className="text-xs text-atlantic-stone mt-1">— {h.articleTitle}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-atlantic-stone text-sm italic">
                No highlights yet. Return to research to highlight text.
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="p-4">
            <h3 className="label">Notes ({notes.length})</h3>
            {notes.length > 0 ? (
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-atlantic-cream p-3 rounded border border-atlantic-pearl"
                  >
                    <p className="text-sm text-atlantic-slate">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-atlantic-stone text-sm italic">
                No notes yet. Return to research to add notes.
              </p>
            )}
          </div>

          {/* Quick Add Note */}
          <div className="p-4 border-t border-atlantic-pearl">
            <Link
              to={`/student/classroom/${classroomId}`}
              className="text-atlantic-gold text-sm hover:underline"
            >
              ← Return to sources to add more research
            </Link>
          </div>
        </div>

        {/* Right Panel - Writing Area */}
        <div className="flex-1 flex flex-col bg-white relative">
          {/* Writing Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto relative">
              <RichTextEditor
                content={essay}
                onChange={handleEssayChange}
                onActivity={socratic.recordActivity}
                placeholder={`Begin writing your essay here...

Consider:
- What is your main argument?
- What evidence from the sources supports your position?
- What counterarguments might someone raise?`}
              />
            </div>
          </div>

          {/* Socratic Tutor Popup */}
          <SocraticTutor
            isVisible={socratic.isVisible}
            onDismiss={socratic.dismiss}
            onRequestAnother={socratic.requestAnother}
            currentQuestion={socratic.currentQuestion}
            triggerReason={socratic.triggerReason}
          />

          {/* Trigger Button (when tutor not visible) */}
          {!socratic.isVisible && (
            <SocraticTriggerButton onClick={socratic.triggerManually} />
          )}
        </div>
      </div>
    </div>
  )
}
