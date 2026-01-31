import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageLayout } from '../../components/layout/PageLayout'
import { useAppStore } from '../../lib/stores/app-store'
import { StudentDetailModal } from '../../components/teacher/StudentDetailModal'

// Type for engaged source with passage details
interface HighlightPassage {
  text: string
  studentName: string
}

interface EngagedSource {
  title: string
  author: string
  highlights: number
  passages: HighlightPassage[]
}

// Topic-specific engaged sources for Day 30 demo with realistic numbers and passage details
const ENGAGED_SOURCES_BY_TOPIC: Record<string, EngagedSource[]> = {
  'climate-change': [
    {
      title: 'A Sicker, Poorer, and Less Abundant World',
      author: 'Robinson Meyer',
      highlights: 6,
      passages: [
        { text: 'The cumulative scientific evidence is unequivocal: climate change presents existential risks to human civilization.', studentName: 'Taylor Williams' },
        { text: 'Global warming could outpace our ability to adapt, leaving millions displaced and vulnerable.', studentName: 'Alex Chen' },
        { text: 'The economic costs of inaction far exceed the investments required for mitigation.', studentName: 'Jordan Smith' },
        { text: 'Rising sea levels threaten coastal communities that are home to nearly half of the world\'s population.', studentName: 'Taylor Williams' },
        { text: 'We are already seeing the health impacts: increased respiratory illness, heat-related deaths, and spread of tropical diseases.', studentName: 'Alex Chen' },
        { text: 'The window for meaningful action is rapidly closing.', studentName: 'Taylor Williams' },
      ],
    },
    {
      title: 'Scientists Are Moving Forests North',
      author: 'Ed Yong',
      highlights: 5,
      passages: [
        { text: 'Assisted migration represents a radical departure from traditional conservation approaches.', studentName: 'Taylor Williams' },
        { text: 'Trees cannot migrate fast enough to keep pace with shifting climate zones.', studentName: 'Alex Chen' },
        { text: 'The ethical implications of deliberately relocating species are hotly debated.', studentName: 'Jordan Smith' },
        { text: 'Some scientists argue we have a moral obligation to help species survive the changes we caused.', studentName: 'Taylor Williams' },
        { text: 'Early experiments show promising results, but long-term outcomes remain uncertain.', studentName: 'Alex Chen' },
      ],
    },
    {
      title: 'What the Climate Establishment Missed',
      author: 'Elizabeth Kolbert',
      highlights: 4,
      passages: [
        { text: 'The IPCC consistently underestimated the pace of climate change in its early reports.', studentName: 'Jordan Smith' },
        { text: 'Feedback loops, once dismissed as edge cases, are now driving accelerated warming.', studentName: 'Taylor Williams' },
        { text: 'The scientific community was too conservative in its predictions, not too alarmist.', studentName: 'Alex Chen' },
        { text: 'We built enough fossil fuel infrastructure to blow past the 1.5 degree goal before the ink was dry on Paris.', studentName: 'Jordan Smith' },
      ],
    },
  ],
  'artificial-intelligence': [
    {
      title: 'The Age of AI Has Begun',
      author: 'Derek Thompson',
      highlights: 6,
      passages: [
        { text: 'AI represents the most significant technological shift since the internet.', studentName: 'Taylor Williams' },
        { text: 'The jobs most at risk are not manual labor, but white-collar knowledge work.', studentName: 'Alex Chen' },
        { text: 'We are entering an era where machines can generate creative content indistinguishable from human work.', studentName: 'Jordan Smith' },
        { text: 'The concentration of AI capabilities in a few companies raises serious concerns about power.', studentName: 'Taylor Williams' },
        { text: 'Education systems are wholly unprepared for AI-native generations.', studentName: 'Alex Chen' },
        { text: 'The pace of advancement has surprised even the most optimistic researchers.', studentName: 'Taylor Williams' },
      ],
    },
    {
      title: 'What AI Can Tell Us About Intelligence',
      author: 'Ross Andersen',
      highlights: 5,
      passages: [
        { text: 'Machine learning has revealed that intelligence may be more about pattern recognition than logical reasoning.', studentName: 'Taylor Williams' },
        { text: 'The brain\'s architecture is far more parallel and distributed than early AI researchers assumed.', studentName: 'Alex Chen' },
        { text: 'Consciousness remains the hardest problem, untouched by AI progress.', studentName: 'Jordan Smith' },
        { text: 'Emergent capabilities in large language models challenge our understanding of cognition.', studentName: 'Taylor Williams' },
        { text: 'AI forces us to confront what makes human intelligence truly unique.', studentName: 'Alex Chen' },
      ],
    },
    {
      title: 'The Moral Machine',
      author: 'Adrienne LaFrance',
      highlights: 4,
      passages: [
        { text: 'Autonomous vehicles must make ethical decisions that humans have never had to explicitly program.', studentName: 'Jordan Smith' },
        { text: 'Different cultures have fundamentally different moral intuitions about AI decision-making.', studentName: 'Taylor Williams' },
        { text: 'The trolley problem, once a philosophical thought experiment, is now an engineering requirement.', studentName: 'Alex Chen' },
        { text: 'Who bears responsibility when an algorithm makes a harmful decision?', studentName: 'Jordan Smith' },
      ],
    },
  ],
  'technology-society': [
    {
      title: 'The Dark Side of Social Media',
      author: 'Alexis Madrigal',
      highlights: 6,
      passages: [
        { text: 'Social media platforms are optimized for engagement, not for user wellbeing.', studentName: 'Taylor Williams' },
        { text: 'The adolescent mental health crisis correlates strongly with smartphone adoption.', studentName: 'Alex Chen' },
        { text: 'Algorithmic amplification of outrage has fundamentally changed political discourse.', studentName: 'Jordan Smith' },
        { text: 'We traded privacy for convenience without understanding the true cost.', studentName: 'Taylor Williams' },
        { text: 'The attention economy treats human focus as a resource to be extracted.', studentName: 'Alex Chen' },
        { text: 'Echo chambers are not a bug; they are a feature that maximizes engagement.', studentName: 'Taylor Williams' },
      ],
    },
    {
      title: 'How Technology Is Reshaping Democracy',
      author: 'Anne Applebaum',
      highlights: 5,
      passages: [
        { text: 'Authoritarian regimes have weaponized social media more effectively than democracies.', studentName: 'Taylor Williams' },
        { text: 'The speed of information spread has outpaced our institutions\' ability to respond.', studentName: 'Alex Chen' },
        { text: 'Disinformation campaigns can now be automated and personalized at scale.', studentName: 'Jordan Smith' },
        { text: 'Traditional journalism cannot compete with viral falsehoods in the attention economy.', studentName: 'Taylor Williams' },
        { text: 'Democratic deliberation requires shared facts, which technology is undermining.', studentName: 'Alex Chen' },
      ],
    },
    {
      title: 'The Attention Economy',
      author: 'Franklin Foer',
      highlights: 4,
      passages: [
        { text: 'Tech companies have learned to exploit psychological vulnerabilities for profit.', studentName: 'Jordan Smith' },
        { text: 'Deep work and sustained focus are becoming rare and valuable skills.', studentName: 'Taylor Williams' },
        { text: 'Our devices are designed to be addictive, not useful.', studentName: 'Alex Chen' },
        { text: 'The cost of constant distraction is borne by individuals, while profits flow to platforms.', studentName: 'Jordan Smith' },
      ],
    },
  ],
}

// Get engaged sources appropriate for the topic
function getMostEngagedSources(topicId?: string): EngagedSource[] {
  return ENGAGED_SOURCES_BY_TOPIC[topicId || 'climate-change'] || ENGAGED_SOURCES_BY_TOPIC['climate-change']
}

// Day 30 mock data - students have made progress
const DAY_30_STUDENTS = [
  {
    id: '1',
    name: 'Alex Chen',
    articlesRead: 5,
    highlights: 12,
    notes: 8,
    essayProgress: 75,
    status: 'writing',
  },
  {
    id: '2',
    name: 'Jordan Smith',
    articlesRead: 3,
    highlights: 6,
    notes: 4,
    essayProgress: 30,
    status: 'researching',
  },
  {
    id: '3',
    name: 'Taylor Williams',
    articlesRead: 7,
    highlights: 18,
    notes: 15,
    essayProgress: 100,
    status: 'submitted',
  },
]

// Day 1 mock data - students just joined, no progress yet
const DAY_1_STUDENTS = [
  {
    id: '1',
    name: 'Alex Chen',
    articlesRead: 0,
    highlights: 0,
    notes: 0,
    essayProgress: 0,
    status: 'not_started',
  },
  {
    id: '2',
    name: 'Jordan Smith',
    articlesRead: 0,
    highlights: 0,
    notes: 0,
    essayProgress: 0,
    status: 'not_started',
  },
  {
    id: '3',
    name: 'Taylor Williams',
    articlesRead: 0,
    highlights: 0,
    notes: 0,
    essayProgress: 0,
    status: 'not_started',
  },
]

export function TeacherReview() {
  const { classroomId } = useParams()
  const { demoMode, getClassroomById } = useAppStore()
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [expandedSourceIndex, setExpandedSourceIndex] = useState<number | null>(null)

  // Get classroom from store, fallback to demo data
  const classroom = classroomId ? getClassroomById(classroomId) : null

  // Use appropriate mock students based on demo mode
  const students = demoMode === 'day30' ? DAY_30_STUDENTS : DAY_1_STUDENTS

  // Calculate stats based on students
  const stats = {
    total: students.length,
    notStarted: students.filter((s) => s.status === 'not_started').length,
    researching: students.filter((s) => s.status === 'researching').length,
    writing: students.filter((s) => s.status === 'writing').length,
    submitted: students.filter((s) => s.status === 'submitted').length,
  }

  return (
    <PageLayout
      title="Classroom Review"
      subtitle={classroom?.title || 'Classroom'}
      userRole="teacher"
      showBackLink
      backTo="/teacher"
    >
      {/* Classroom Info */}
      <div className="summary-card mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-2">
              <span className="text-atlantic-gold">✦</span> Assignment
            </h3>
            <p className="text-atlantic-slate">{classroom?.assignmentPrompt || 'No assignment set'}</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <div className="text-sm text-atlantic-stone mb-1">Share Code</div>
              <div className="font-mono text-2xl font-bold text-atlantic-charcoal">
                {classroom?.shareCode || '—'}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/teacher/classroom/${classroomId}/customize`}
                className="btn btn-primary text-sm"
              >
                Customize Classroom
              </Link>
              <Link
                to={`/teacher/classroom/${classroomId}/research`}
                className="btn btn-secondary text-sm"
              >
                Preview Materials
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Students', value: stats.total },
          { label: 'Not Started', value: stats.notStarted },
          { label: 'Researching', value: stats.researching },
          { label: 'Writing', value: stats.writing },
          { label: 'Submitted', value: stats.submitted },
        ].filter((stat) => demoMode === 'day1' ? stat.label === 'Students' || stat.label === 'Not Started' : true)
         .map((stat) => (
          <div key={stat.label} className="card text-center">
            <div className="font-serif text-3xl font-bold text-atlantic-charcoal">
              {stat.value}
            </div>
            <div className="text-atlantic-stone text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Student List */}
      <div className="card">
        <div className="flex items-center justify-between border-b border-atlantic-pearl pb-4 mb-4">
          <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal">
            Student Progress
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-atlantic-stone text-sm border-b border-atlantic-pearl">
                <th className="pb-3 font-medium">Student</th>
                <th className="pb-3 font-medium">Articles</th>
                <th className="pb-3 font-medium">Highlights</th>
                <th className="pb-3 font-medium">Notes</th>
                <th className="pb-3 font-medium">Essay Progress</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-atlantic-pearl last:border-0"
                >
                  <td className="py-4 font-medium text-atlantic-charcoal">
                    {student.name}
                  </td>
                  <td className="py-4 text-atlantic-slate">{student.articlesRead}</td>
                  <td className="py-4 text-atlantic-slate">{student.highlights}</td>
                  <td className="py-4 text-atlantic-slate">{student.notes}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-atlantic-pearl rounded-full overflow-hidden">
                        <div
                          className="h-full bg-atlantic-gold rounded-full"
                          style={{ width: `${student.essayProgress}%` }}
                        />
                      </div>
                      <span className="text-sm text-atlantic-stone w-10">
                        {student.essayProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`meta-tag ${
                        student.status === 'submitted'
                          ? 'bg-green-100 text-green-800'
                          : student.status === 'writing'
                          ? 'bg-atlantic-gold/10 text-atlantic-gold'
                          : student.status === 'not_started'
                          ? 'bg-atlantic-stone/10 text-atlantic-stone'
                          : ''
                      }`}
                    >
                      {student.status === 'not_started' ? 'not started' : student.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => setSelectedStudentId(student.id)}
                      className="text-atlantic-gold text-sm hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Sources - only show on Day 30 when students have made progress */}
      {demoMode === 'day30' && (
        <div className="card mt-8">
          <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-4">
            Most Engaged Sources
          </h3>
          <p className="text-sm text-atlantic-stone mb-4">
            Click on a source to see which passages students highlighted
          </p>
          <div className="space-y-3">
            {getMostEngagedSources(classroom?.topicId).map((source, i) => (
              <div key={i} className="rounded overflow-hidden">
                <button
                  onClick={() => setExpandedSourceIndex(expandedSourceIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-3 bg-atlantic-cream hover:bg-atlantic-pearl/50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-atlantic-stone transition-transform ${expandedSourceIndex === i ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                    <div>
                      <div className="font-medium text-atlantic-charcoal">
                        {source.title}
                      </div>
                      <div className="text-sm text-atlantic-stone">{source.author}</div>
                    </div>
                  </div>
                  <div className="text-sm text-atlantic-gold">
                    {source.highlights} highlights
                  </div>
                </button>
                {expandedSourceIndex === i && (
                  <div className="bg-white border-l-2 border-atlantic-gold px-4 py-3 space-y-3">
                    <div className="text-sm font-medium text-atlantic-slate mb-2">
                      Highlighted passages:
                    </div>
                    {source.passages.map((passage, j) => (
                      <div key={j} className="pl-4 border-l-2 border-atlantic-pearl">
                        <p className="text-sm text-atlantic-charcoal italic mb-1">
                          "{passage.text}"
                        </p>
                        <p className="text-xs text-atlantic-stone">
                          — {passage.studentName}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Essays Link - only show when there are submitted essays (Day 30) */}
      {demoMode === 'day30' && stats.submitted > 0 && (
        <div className="card mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal">
                Submitted Essays
              </h3>
              <p className="text-atlantic-stone text-sm mt-1">
                {stats.submitted} student{stats.submitted !== 1 ? 's have' : ' has'} submitted their essays
              </p>
            </div>
            <Link
              to={`/teacher/classroom/${classroomId}/essays`}
              className="btn btn-primary"
            >
              Review Submitted Essays
            </Link>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      <StudentDetailModal
        studentId={selectedStudentId || ''}
        isOpen={selectedStudentId !== null}
        onClose={() => setSelectedStudentId(null)}
        demoMode={demoMode}
      />
    </PageLayout>
  )
}
