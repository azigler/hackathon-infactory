// Student Detail View Modal (bd-2pe)
// Shows individual student progress when teacher clicks "View Details"

import { useState } from 'react'

// Mock student detail data for demo
interface ArticleRead {
  id: string
  title: string
  readAt: string // ISO timestamp
  timeSpent: number // seconds
}

interface HighlightDetail {
  id: string
  articleTitle: string
  text: string
  createdAt: string
}

interface NoteDetail {
  id: string
  content: string
  articleTitle?: string
  createdAt: string
}

interface StudentDetail {
  id: string
  name: string
  articlesRead: ArticleRead[]
  highlights: HighlightDetail[]
  notes: NoteDetail[]
  totalTimeSpent: number // seconds
  essayProgress: number
  status: string
  essayDraft?: string // HTML content of the essay draft
}

// Mock data for demo - Day 30 student details
const MOCK_STUDENT_DETAILS: Record<string, StudentDetail> = {
  '1': {
    id: '1',
    name: 'Alex Chen',
    articlesRead: [
      { id: '676065:1', title: 'This Is the New Baseline Earth', readAt: '2026-01-15T10:30:00Z', timeSpent: 720 },
      { id: '671361:2', title: 'The Electricity Industry Quietly Spread Climate Denial', readAt: '2026-01-16T14:15:00Z', timeSpent: 540 },
      { id: '629486:1', title: 'The 1.5 Degree Goal Is All But Dead', readAt: '2026-01-18T09:00:00Z', timeSpent: 480 },
      { id: '672183:0', title: 'A Cold Spot Near the Galapagos Is Fending Off Climate Change', readAt: '2026-01-20T11:45:00Z', timeSpent: 360 },
      { id: '682929:4', title: 'The Real Stakes of the Fight Over "Abundance"', readAt: '2026-01-22T16:30:00Z', timeSpent: 600 },
    ],
    highlights: [
      { id: 'h1', articleTitle: 'This Is the New Baseline Earth', text: 'even if every nation managed to follow through on its stated emission reduction plans, the world would still be on track for nearly 3 degrees Celsius of global warming by 2100', createdAt: '2026-01-15T10:45:00Z' },
      { id: 'h2', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', text: 'The industry\'s leaders made a fateful decision: They began denying that climate change existed altogether', createdAt: '2026-01-16T14:30:00Z' },
      { id: 'h3', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'The question is no longer whether we can prevent all harm, but how much harm we\'re willing to accept', createdAt: '2026-01-18T09:20:00Z' },
      { id: 'h4', articleTitle: 'A Cold Spot Near the Galapagos', text: 'The cool water sustains populations of penguins, marine iguanas, sea lions', createdAt: '2026-01-20T12:00:00Z' },
      { id: 'h5', articleTitle: 'The Real Stakes of the Fight Over "Abundance"', text: 'preserving nature requires building new infrastructure: green energy sources, pipelines', createdAt: '2026-01-22T16:50:00Z' },
      { id: 'h6', articleTitle: 'This Is the New Baseline Earth', text: 'climate change has already begun reshaping ecosystems', createdAt: '2026-01-15T10:50:00Z' },
      { id: 'h7', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'adaptation alongside mitigation is now essential', createdAt: '2026-01-18T09:30:00Z' },
      { id: 'h8', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', text: 'The same playbook had worked for tobacco companies', createdAt: '2026-01-16T14:45:00Z' },
      { id: 'h9', articleTitle: 'The Real Stakes of the Fight Over "Abundance"', text: 'NEPA becoming an obstacle to climate action', createdAt: '2026-01-22T17:00:00Z' },
      { id: 'h10', articleTitle: 'A Cold Spot Near the Galapagos', text: 'unique ecosystem defying global trends', createdAt: '2026-01-20T12:10:00Z' },
      { id: 'h11', articleTitle: 'This Is the New Baseline Earth', text: 'weather patterns we once called extreme are becoming normal', createdAt: '2026-01-15T11:00:00Z' },
      { id: 'h12', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'lost decades of inaction have narrowed our options', createdAt: '2026-01-18T09:40:00Z' },
    ],
    notes: [
      { id: 'n1', content: 'Key theme: The gap between scientific consensus and policy action. Scientists have known for decades, but political will hasn\'t kept pace.', createdAt: '2026-01-16T15:00:00Z' },
      { id: 'n2', content: 'Interesting tension: Old environmental movement focused on stopping construction, but climate action now REQUIRES building (solar, wind, transit).', articleTitle: 'The Real Stakes of the Fight Over "Abundance"', createdAt: '2026-01-22T17:15:00Z' },
      { id: 'n3', content: 'Question to explore: How did industry denial campaigns affect public perception? Connection to tobacco tactics?', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', createdAt: '2026-01-16T15:30:00Z' },
      { id: 'n4', content: 'The 1.5 degree goal seems increasingly unrealistic - should I argue for adaptation alongside mitigation?', createdAt: '2026-01-18T10:00:00Z' },
      { id: 'n5', content: 'Draft thesis: Climate inaction is not ignorance but deliberate obstruction - trace the history.', createdAt: '2026-01-20T13:00:00Z' },
      { id: 'n6', content: 'Consider framing: from prevention to adaptation - what this shift means for policy.', createdAt: '2026-01-22T18:00:00Z' },
      { id: 'n7', content: 'Need to research NEPA more - potential counterargument to address.', articleTitle: 'The Real Stakes of the Fight Over "Abundance"', createdAt: '2026-01-23T09:00:00Z' },
      { id: 'n8', content: 'Outline: 1) Historical denial, 2) Lost decades, 3) Current reality, 4) Path forward', createdAt: '2026-01-24T10:00:00Z' },
    ],
    totalTimeSpent: 2700,
    essayProgress: 75,
    status: 'writing',
    essayDraft: `<h1>The Climate Reckoning: Why We Knew But Didn't Act</h1>

<h2>Introduction</h2>
<p>For decades, the scientific community has sounded the alarm on climate change, yet meaningful action remains elusive. As <em>The Atlantic's</em> coverage reveals, this isn't a failure of knowledge—it's a failure of <strong>collective will</strong>, complicated by deliberate misinformation campaigns and policy paralysis. This essay examines how industry denial, political inaction, and shifting environmental priorities have brought us to a critical crossroads in the fight against global warming.</p>

<h2>The Industry Denial Campaign</h2>
<p>The evidence of climate change has been clear since at least the 1980s. When NASA's top climate scientists testified before Congress in 1988 that global warming had already begun, the electricity industry didn't respond with innovation—they responded with <strong>denial</strong>. According to <em>The Atlantic</em>:</p>
<blockquote>The industry's leaders made a fateful decision: They began denying that climate change existed altogether.</blockquote>
<p>The Edison Electric Institute helped establish the Global Climate Coalition, one of the most notorious advocates of climate skepticism. This wasn't ignorance; it was <em>strategic obstruction</em>...</p>

<p><em>[Draft in progress - additional sections to be added]</em></p>`,
  },
  '2': {
    id: '2',
    name: 'Jordan Smith',
    articlesRead: [
      { id: '676065:1', title: 'This Is the New Baseline Earth', readAt: '2026-01-20T11:00:00Z', timeSpent: 420 },
      { id: '671361:2', title: 'The Electricity Industry Quietly Spread Climate Denial', readAt: '2026-01-22T10:30:00Z', timeSpent: 360 },
      { id: '629486:1', title: 'The 1.5 Degree Goal Is All But Dead', readAt: '2026-01-25T14:00:00Z', timeSpent: 300 },
    ],
    highlights: [
      { id: 'h1', articleTitle: 'This Is the New Baseline Earth', text: 'the world would still be on track for nearly 3 degrees Celsius of global warming', createdAt: '2026-01-20T11:15:00Z' },
      { id: 'h2', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', text: 'They began denying that climate change existed altogether', createdAt: '2026-01-22T10:45:00Z' },
      { id: 'h3', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'The question is no longer whether we can prevent all harm', createdAt: '2026-01-25T14:20:00Z' },
      { id: 'h4', articleTitle: 'This Is the New Baseline Earth', text: 'ecosystems adapting in real-time', createdAt: '2026-01-20T11:30:00Z' },
      { id: 'h5', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', text: 'deliberate misinformation campaign', createdAt: '2026-01-22T11:00:00Z' },
      { id: 'h6', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'adaptation is no longer optional', createdAt: '2026-01-25T14:35:00Z' },
    ],
    notes: [
      { id: 'n1', content: 'Starting to see patterns in how denial was organized - need more sources on this.', createdAt: '2026-01-22T11:30:00Z' },
      { id: 'n2', content: 'The temperature targets seem arbitrary but symbolically important.', articleTitle: 'The 1.5 Degree Goal Is All But Dead', createdAt: '2026-01-25T15:00:00Z' },
      { id: 'n3', content: 'Potential angle: compare industry responses across different sectors.', createdAt: '2026-01-26T09:00:00Z' },
      { id: 'n4', content: 'Need to read more articles before starting the essay.', createdAt: '2026-01-27T10:00:00Z' },
    ],
    totalTimeSpent: 1080,
    essayProgress: 30,
    status: 'researching',
    essayDraft: `<h1>Untitled Essay</h1>

<h2>Introduction</h2>
<p>Climate change is one of the most pressing issues of our time. In this essay, I will explore...</p>

<p><em>[Still researching - outline in progress]</em></p>`,
  },
  '3': {
    id: '3',
    name: 'Taylor Williams',
    articlesRead: [
      { id: '676065:1', title: 'This Is the New Baseline Earth', readAt: '2026-01-10T09:00:00Z', timeSpent: 900 },
      { id: '671361:2', title: 'The Electricity Industry Quietly Spread Climate Denial', readAt: '2026-01-11T10:00:00Z', timeSpent: 780 },
      { id: '629486:1', title: 'The 1.5 Degree Goal Is All But Dead', readAt: '2026-01-12T14:00:00Z', timeSpent: 660 },
      { id: '672183:0', title: 'A Cold Spot Near the Galapagos Is Fending Off Climate Change', readAt: '2026-01-13T11:00:00Z', timeSpent: 480 },
      { id: '682929:4', title: 'The Real Stakes of the Fight Over "Abundance"', readAt: '2026-01-14T15:00:00Z', timeSpent: 720 },
      { id: '675464:0', title: 'The Banality of Bad Faith Science', readAt: '2026-01-15T10:00:00Z', timeSpent: 540 },
      { id: '684521:3', title: 'Climate Migration Is Already Reshaping America', readAt: '2026-01-16T13:00:00Z', timeSpent: 600 },
    ],
    highlights: [
      { id: 'h1', articleTitle: 'This Is the New Baseline Earth', text: 'nearly 3 degrees Celsius of global warming by 2100', createdAt: '2026-01-10T09:20:00Z' },
      { id: 'h2', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', text: 'denying that climate change existed altogether', createdAt: '2026-01-11T10:30:00Z' },
      { id: 'h3', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'how much harm we\'re willing to accept', createdAt: '2026-01-12T14:25:00Z' },
      { id: 'h4', articleTitle: 'A Cold Spot Near the Galapagos', text: 'sustains populations of penguins, marine iguanas', createdAt: '2026-01-13T11:20:00Z' },
      { id: 'h5', articleTitle: 'The Real Stakes of the Fight Over "Abundance"', text: 'building new infrastructure: green energy sources', createdAt: '2026-01-14T15:30:00Z' },
      { id: 'h6', articleTitle: 'The Banality of Bad Faith Science', text: 'I left out the full truth to get my climate change paper published', createdAt: '2026-01-15T10:25:00Z' },
      { id: 'h7', articleTitle: 'Climate Migration Is Already Reshaping America', text: 'millions will be displaced by rising seas', createdAt: '2026-01-16T13:30:00Z' },
      { id: 'h8', articleTitle: 'This Is the New Baseline Earth', text: 'ecosystems crossing tipping points', createdAt: '2026-01-10T09:40:00Z' },
      { id: 'h9', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', text: 'Global Climate Coalition', createdAt: '2026-01-11T10:50:00Z' },
      { id: 'h10', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'every fraction of a degree matters', createdAt: '2026-01-12T14:45:00Z' },
      { id: 'h11', articleTitle: 'The Real Stakes of the Fight Over "Abundance"', text: 'environmental laws becoming obstacles', createdAt: '2026-01-14T15:50:00Z' },
      { id: 'h12', articleTitle: 'The Banality of Bad Faith Science', text: 'pressure to conform to political narratives', createdAt: '2026-01-15T10:45:00Z' },
      { id: 'h13', articleTitle: 'Climate Migration Is Already Reshaping America', text: 'new climate refugees within our borders', createdAt: '2026-01-16T13:50:00Z' },
      { id: 'h14', articleTitle: 'A Cold Spot Near the Galapagos', text: 'rare success story in climate adaptation', createdAt: '2026-01-13T11:40:00Z' },
      { id: 'h15', articleTitle: 'This Is the New Baseline Earth', text: 'no returning to the old normal', createdAt: '2026-01-10T10:00:00Z' },
      { id: 'h16', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', text: 'tobacco industry playbook', createdAt: '2026-01-11T11:10:00Z' },
      { id: 'h17', articleTitle: 'The 1.5 Degree Goal Is All But Dead', text: 'window for action closing rapidly', createdAt: '2026-01-12T15:00:00Z' },
      { id: 'h18', articleTitle: 'Climate Migration Is Already Reshaping America', text: 'infrastructure not designed for new climate', createdAt: '2026-01-16T14:10:00Z' },
    ],
    notes: [
      { id: 'n1', content: 'Thesis: Climate inaction represents a collective failure of institutions, from industry to media to government.', createdAt: '2026-01-12T16:00:00Z' },
      { id: 'n2', content: 'Structure: Historical denial -> Current reality -> Case studies -> Solutions', createdAt: '2026-01-13T12:00:00Z' },
      { id: 'n3', content: 'The Galapagos case is a good counterpoint - shows what\'s possible with protection.', articleTitle: 'A Cold Spot Near the Galapagos', createdAt: '2026-01-13T12:30:00Z' },
      { id: 'n4', content: 'Industry denial is the central villain of this narrative - well documented.', articleTitle: 'The Electricity Industry Quietly Spread Climate Denial', createdAt: '2026-01-11T11:30:00Z' },
      { id: 'n5', content: 'Bad faith science article shows how even scientists are pressured - adds nuance.', articleTitle: 'The Banality of Bad Faith Science', createdAt: '2026-01-15T11:00:00Z' },
      { id: 'n6', content: 'Migration angle makes it personal and immediate - good for conclusion.', articleTitle: 'Climate Migration Is Already Reshaping America', createdAt: '2026-01-16T14:30:00Z' },
      { id: 'n7', content: 'Draft complete! Main argument: We knew, we denied, now we adapt.', createdAt: '2026-01-20T15:00:00Z' },
      { id: 'n8', content: 'Revised introduction to be more compelling - start with the denial timeline.', createdAt: '2026-01-22T10:00:00Z' },
      { id: 'n9', content: 'Added section on policy paralysis - NEPA example is perfect illustration.', createdAt: '2026-01-23T11:00:00Z' },
      { id: 'n10', content: 'Final review complete - ready to submit.', createdAt: '2026-01-28T14:00:00Z' },
      { id: 'n11', content: 'Proofreading notes: check citations, tighten conclusion.', createdAt: '2026-01-28T15:00:00Z' },
      { id: 'n12', content: 'All done! Strong argument with good evidence from sources.', createdAt: '2026-01-28T16:00:00Z' },
      { id: 'n13', content: 'Feedback from peer review: add more on solutions, but overall strong.', createdAt: '2026-01-27T09:00:00Z' },
      { id: 'n14', content: 'Consider adding section on international comparisons if time allows.', createdAt: '2026-01-25T10:00:00Z' },
      { id: 'n15', content: 'Word count: 2,847 - within requirements.', createdAt: '2026-01-28T16:30:00Z' },
    ],
    totalTimeSpent: 4680,
    essayProgress: 100,
    status: 'submitted',
    essayDraft: `<h1>The Climate Reckoning: Why We Knew But Didn't Act</h1>

<h2>Introduction</h2>
<p>For decades, the scientific community has sounded the alarm on climate change, yet meaningful action remains elusive. As <em>The Atlantic's</em> coverage reveals, this isn't a failure of knowledge—it's a failure of <strong>collective will</strong>, complicated by deliberate misinformation campaigns and policy paralysis. This essay examines how industry denial, political inaction, and shifting environmental priorities have brought us to a critical crossroads in the fight against global warming.</p>

<h2>The Industry Denial Campaign</h2>
<p>The evidence of climate change has been clear since at least the 1980s. When NASA's top climate scientists testified before Congress in 1988 that global warming had already begun, the electricity industry didn't respond with innovation—they responded with <strong>denial</strong>. According to <em>The Atlantic</em>:</p>
<blockquote>The industry's leaders made a fateful decision: They began denying that climate change existed altogether.</blockquote>
<p>The Edison Electric Institute helped establish the Global Climate Coalition, one of the most notorious advocates of climate skepticism. This wasn't ignorance; it was <em>strategic obstruction</em>. The same playbook had worked for tobacco companies, and it worked for fossil fuel interests too. Even today, as one scientist admitted in <em>The Banality of Bad Faith Science</em>, pressure to downplay findings continues to shape how climate research gets published.</p>

<h2>The Consequences of Inaction</h2>
<p>Today, we face the consequences of those lost decades. The <strong>1.5 degree Celsius target</strong> that scientists once considered our safe limit is now, as one Atlantic article bluntly states, "all but dead." The math is sobering:</p>
<blockquote>Even if every nation managed to follow through on its stated emission reduction plans, the world would still be on track for nearly 3 degrees Celsius of global warming by 2100.</blockquote>
<p>The question is no longer whether we can prevent climate change—it's <strong>how much harm we're willing to accept</strong>. Meanwhile, isolated pockets of hope remain: a cold spot near the Galapagos continues to sustain populations of penguins, marine iguanas, and sea lions that would otherwise be unable to survive on the equator. But these refuges are exceptions, not the rule.</p>

<h2>The Path Forward</h2>
<p>What strikes me most is the cruel irony now facing environmentalists. The very laws designed to protect nature—like <strong>NEPA</strong>—have become obstacles to building the green infrastructure we desperately need. As the abundance movement argues, preserving nature in the era of global warming <em>requires</em> building new infrastructure: solar farms, wind turbines, energy pipelines, and dense urban housing that enables low-carbon lifestyles.</p>
<p>The old environmentalism said "stop building." The new environmentalism must say "build differently." Whether we can make this transition fast enough remains the defining question of our generation.</p>`,
  },
}

// Day 1 mock data - empty details
const MOCK_DAY1_STUDENT_DETAILS: Record<string, StudentDetail> = {
  '1': {
    id: '1',
    name: 'Alex Chen',
    articlesRead: [],
    highlights: [],
    notes: [],
    totalTimeSpent: 0,
    essayProgress: 0,
    status: 'not_started',
  },
  '2': {
    id: '2',
    name: 'Jordan Smith',
    articlesRead: [],
    highlights: [],
    notes: [],
    totalTimeSpent: 0,
    essayProgress: 0,
    status: 'not_started',
  },
  '3': {
    id: '3',
    name: 'Taylor Williams',
    articlesRead: [],
    highlights: [],
    notes: [],
    totalTimeSpent: 0,
    essayProgress: 0,
    status: 'not_started',
  },
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${mins}m`
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

interface StudentDetailModalProps {
  studentId: string
  isOpen: boolean
  onClose: () => void
  demoMode?: 'day1' | 'day30'
}

export function StudentDetailModal({ studentId, isOpen, onClose, demoMode = 'day30' }: StudentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'articles' | 'highlights' | 'notes' | 'essay'>('articles')

  if (!isOpen) return null

  const studentDetails = demoMode === 'day30'
    ? MOCK_STUDENT_DETAILS[studentId]
    : MOCK_DAY1_STUDENT_DETAILS[studentId]

  if (!studentDetails) return null

  const tabs = [
    { id: 'articles' as const, label: 'Articles Read', count: studentDetails.articlesRead.length },
    { id: 'highlights' as const, label: 'Highlights', count: studentDetails.highlights.length },
    { id: 'notes' as const, label: 'Notes', count: studentDetails.notes.length },
    { id: 'essay' as const, label: 'Essay Draft', count: null },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-atlantic-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-atlantic-pearl px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-atlantic-charcoal">
                {studentDetails.name}
              </h2>
              <p className="text-atlantic-stone text-sm mt-1">
                Student Progress Details
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-atlantic-stone hover:text-atlantic-charcoal transition-colors p-2"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex-shrink-0 grid grid-cols-4 gap-4 px-6 py-4 bg-atlantic-cream/50 border-b border-atlantic-pearl">
          <div className="text-center">
            <div className="font-serif text-2xl font-bold text-atlantic-charcoal">
              {studentDetails.articlesRead.length}
            </div>
            <div className="text-xs text-atlantic-stone">Articles Read</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-2xl font-bold text-atlantic-charcoal">
              {studentDetails.highlights.length}
            </div>
            <div className="text-xs text-atlantic-stone">Highlights</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-2xl font-bold text-atlantic-charcoal">
              {studentDetails.notes.length}
            </div>
            <div className="text-xs text-atlantic-stone">Notes</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-2xl font-bold text-atlantic-charcoal">
              {formatTime(studentDetails.totalTimeSpent)}
            </div>
            <div className="text-xs text-atlantic-stone">Time Spent</div>
          </div>
        </div>

        {/* Essay Progress */}
        <div className="flex-shrink-0 px-6 py-3 border-b border-atlantic-pearl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-atlantic-slate">Essay Progress</span>
            <span className={`meta-tag ${
              studentDetails.status === 'submitted'
                ? 'bg-green-100 text-green-800'
                : studentDetails.status === 'writing'
                ? 'bg-atlantic-gold/10 text-atlantic-gold'
                : studentDetails.status === 'not_started'
                ? 'bg-atlantic-stone/10 text-atlantic-stone'
                : ''
            }`}>
              {studentDetails.status === 'not_started' ? 'not started' : studentDetails.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-atlantic-pearl rounded-full overflow-hidden">
              <div
                className="h-full bg-atlantic-gold rounded-full transition-all"
                style={{ width: `${studentDetails.essayProgress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-atlantic-charcoal w-12 text-right">
              {studentDetails.essayProgress}%
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 border-b border-atlantic-pearl px-6">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-atlantic-gold text-atlantic-charcoal'
                    : 'border-transparent text-atlantic-stone hover:text-atlantic-slate'
                }`}
              >
                {tab.label}{tab.count !== null ? ` (${tab.count})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          {studentDetails.articlesRead.length === 0 && studentDetails.highlights.length === 0 && studentDetails.notes.length === 0 ? (
            <div className="text-center py-12 text-atlantic-stone">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
              <p>This student hasn't started their research yet.</p>
              <p className="text-sm mt-1">Check back later for their progress.</p>
            </div>
          ) : (
            <>
              {/* Articles Tab */}
              {activeTab === 'articles' && (
                <div className="space-y-3">
                  {studentDetails.articlesRead.length === 0 ? (
                    <p className="text-atlantic-stone text-center py-8">No articles read yet.</p>
                  ) : (
                    studentDetails.articlesRead.map((article) => (
                      <div
                        key={article.id}
                        className="p-4 bg-atlantic-cream/50 rounded-lg border border-atlantic-pearl"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-atlantic-charcoal">{article.title}</h4>
                            <p className="text-sm text-atlantic-stone mt-1">
                              Read on {formatDate(article.readAt)}
                            </p>
                          </div>
                          <div className="text-sm text-atlantic-gold font-medium">
                            {formatTime(article.timeSpent)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Highlights Tab */}
              {activeTab === 'highlights' && (
                <div className="space-y-3">
                  {studentDetails.highlights.length === 0 ? (
                    <p className="text-atlantic-stone text-center py-8">No highlights yet.</p>
                  ) : (
                    studentDetails.highlights.map((highlight) => (
                      <div
                        key={highlight.id}
                        className="p-4 bg-atlantic-cream/50 rounded-lg border border-atlantic-pearl"
                      >
                        <div className="border-l-4 border-atlantic-gold pl-3">
                          <p className="text-atlantic-charcoal italic">"{highlight.text}"</p>
                        </div>
                        <div className="flex items-center justify-between mt-3 text-sm text-atlantic-stone">
                          <span>From: {highlight.articleTitle}</span>
                          <span>{formatDate(highlight.createdAt)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div className="space-y-3">
                  {studentDetails.notes.length === 0 ? (
                    <p className="text-atlantic-stone text-center py-8">No notes yet.</p>
                  ) : (
                    studentDetails.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 bg-atlantic-cream/50 rounded-lg border border-atlantic-pearl"
                      >
                        <p className="text-atlantic-charcoal">{note.content}</p>
                        <div className="flex items-center justify-between mt-3 text-sm text-atlantic-stone">
                          <span>{note.articleTitle ? `Re: ${note.articleTitle}` : 'General note'}</span>
                          <span>{formatDate(note.createdAt)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Essay Draft Tab */}
              {activeTab === 'essay' && (
                <div className="essay-draft-content">
                  {studentDetails.essayDraft ? (
                    <div
                      className="prose prose-lg max-w-none font-serif text-atlantic-charcoal"
                      dangerouslySetInnerHTML={{ __html: studentDetails.essayDraft }}
                    />
                  ) : (
                    <div className="text-center py-12 text-atlantic-stone">
                      <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>No essay draft started</p>
                      <p className="text-sm mt-1">The student hasn't begun writing their essay yet.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-atlantic-pearl px-6 py-4 bg-atlantic-cream/30">
          <button
            onClick={onClose}
            className="btn btn-secondary w-full"
          >
            Close
          </button>
        </div>
      </div>

      {/* Add prose styles for essay draft rendering */}
      <style>{`
        .essay-draft-content h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }
        .essay-draft-content h2 {
          font-size: 1.35rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1a1a1a;
        }
        .essay-draft-content p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .essay-draft-content blockquote {
          border-left: 4px solid #c9a227;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4a4a4a;
        }
        .essay-draft-content em {
          font-style: italic;
        }
        .essay-draft-content strong {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
