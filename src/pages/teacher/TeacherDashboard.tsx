import { Link } from 'react-router-dom'
import { PageLayout } from '../../components/layout/PageLayout'
import { useAppStore } from '../../lib/stores/app-store'

// Curated topics based on Infactory API research
// These are pre-researched topic packages for educational use
// Climate Change is the PRIMARY demo topic
const CURATED_TOPICS = [
  {
    id: 'climate-change',
    title: 'Climate Change: Science and Society',
    description:
      'Four years of reporting on environmental science, policy debates, and solutions—from IPCC reports to COP30.',
    articleCount: 10,
    dateRange: '2022-2025',
    suggestedGrades: '9-12',
    sampleHeadlines: [
      'A Sicker, Poorer, and Less Abundant World',
      'Scientists Are Moving Forests North',
      'What the Climate Establishment Missed',
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence: Promise and Peril',
    description:
      'From consciousness questions to societal impact—explore how The Atlantic has covered the AI revolution from 2022-2024.',
    articleCount: 10,
    dateRange: '2022-2024',
    suggestedGrades: '10-12',
    sampleHeadlines: [
      'Of God and Machines',
      'AI Isn\'t Omnipotent. It\'s Janky.',
      'In Defense of Humanity',
    ],
  },
  {
    id: 'technology-society',
    title: 'Technology and Society',
    description:
      'How technology shapes democracy, creativity, and human connection—featuring critical perspectives on our digital age.',
    articleCount: 10,
    dateRange: '2022-2025',
    suggestedGrades: '10-12',
    sampleHeadlines: [
      'When AI Becomes a Ouija Board',
      'The World Still Hasn\'t Made Sense of ChatGPT',
      'AI and the Fight Between Democracy and Autocracy',
    ],
  },
]

export function TeacherDashboard() {
  const createdClassrooms = useAppStore((state) => state.createdClassrooms)

  return (
    <PageLayout
      title="The Editor's Desk"
      subtitle="Select a topic to create your classroom"
      userRole="teacher"
    >
      {/* Introduction */}
      <div className="mb-8">
        <p className="text-atlantic-slate text-lg">
          Browse curated newsroom topics from The Atlantic's archive. Select a
          topic to configure a bounded research environment for your students.
        </p>
      </div>

      {/* Topic Grid */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between border-b border-atlantic-pearl pb-4">
          <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal">
            Curated Newsroom Topics
          </h3>
          <span className="text-atlantic-stone text-sm">
            {CURATED_TOPICS.length} topics available
          </span>
        </div>

        {CURATED_TOPICS.map((topic) => (
          <Link key={topic.id} to={`/teacher/setup/${topic.id}`}>
            <article className="article-card">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="meta-tag">{topic.dateRange}</span>
                <span className="meta-tag">{topic.articleCount} articles</span>
                <span className="meta-tag">Grades {topic.suggestedGrades}</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-2">
                {topic.title}
              </h3>
              <p className="text-atlantic-slate mb-3">{topic.description}</p>

              {/* Sample Headlines */}
              <div className="text-sm text-atlantic-stone mb-3">
                <span className="font-medium">Sample headlines: </span>
                {topic.sampleHeadlines.map((h, i) => (
                  <span key={i}>
                    <em>"{h}"</em>
                    {i < topic.sampleHeadlines.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-atlantic-gold text-sm font-medium">
                Configure Classroom →
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Active Classrooms Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between border-b border-atlantic-pearl pb-4 mb-6">
          <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal">
            Your Active Classrooms
          </h3>
          <span className="text-atlantic-stone text-sm">
            {createdClassrooms.length} active
          </span>
        </div>

        {createdClassrooms.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-atlantic-stone italic">
              No active classrooms yet. Select a topic above to create one.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {createdClassrooms.map((classroom) => (
              <div key={classroom.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-1">
                      {classroom.title}
                    </h4>
                    <p className="text-atlantic-slate text-sm mb-3 line-clamp-2">
                      {classroom.assignmentPrompt}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-atlantic-stone">Share Code:</span>
                        <span className="font-mono font-semibold text-atlantic-gold bg-atlantic-gold/10 px-2 py-0.5 rounded">
                          {classroom.shareCode}
                        </span>
                      </div>
                      <span className="text-atlantic-stone">
                        Created: {new Date(classroom.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/teacher/review/${classroom.id}`}
                    className="btn btn-secondary text-sm ml-4"
                  >
                    View Classroom
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
