// Demo state data for "Day 1" to "Day 30" journey
// Pre-populated highlights, notes, and essay draft for demo presentations

import type { Highlight, Note } from '@/types'

// Day 1: Fresh start - student just joined the classroom
export const DAY_1_STATE = {
  highlights: [] as Highlight[],
  notes: [] as Note[],
  essay: '',
}

// Day 30: Accumulated research and writing progress
export const DAY_30_STATE = {
  // 6 highlights from climate change articles - text MUST exactly match article content
  highlights: [
    {
      id: 'demo-h1',
      articleId: '676065:1',
      articleTitle: 'This Is the New Baseline Earth',
      text: 'even if every nation managed to follow through on its stated emission reduction plans, the world would still be on track for nearly 3 degrees Celsius of global warming by 2100',
    },
    {
      id: 'demo-h2',
      articleId: '671361:2',
      articleTitle: 'The Electricity Industry Quietly Spread Climate Denial for Years',
      text: 'The industry\'s leaders made a fateful decision: They began denying that climate change existed altogether',
    },
    {
      id: 'demo-h3',
      articleId: '629486:1',
      articleTitle: 'The 1.5 Degree Goal Is All But Dead',
      text: 'The question is no longer whether we can prevent all harm, but how much harm we\'re willing to accept—and how much we\'re willing to sacrifice to prevent more',
    },
    {
      id: 'demo-h4',
      articleId: '672183:0',
      articleTitle: 'A Cold Spot Near the Galápagos Is Fending Off Climate Change',
      text: 'The cool water sustains populations of penguins, marine iguanas, sea lions, fur seals, and cetaceans that would not be able to stay on the equator year round',
    },
    {
      id: 'demo-h5',
      articleId: '682929:4',
      articleTitle: 'The Real Stakes of the Fight Over "Abundance"',
      text: 'In the era of global warming, however, preserving nature requires building new infrastructure: green energy sources, pipelines to transmit the energy, and new housing and transportation in cities where density allows for a less carbon intensive lifestyle',
    },
    {
      id: 'demo-h6',
      articleId: '675464:0',
      articleTitle: 'The Banality of Bad Faith Science',
      text: 'I left out the full truth to get my climate change paper published',
    },
  ] as Highlight[],

  // 4 notes the "student" has taken during research
  notes: [
    {
      id: 'demo-n1',
      content: 'Key theme: The gap between scientific consensus and policy action. Scientists have known for decades, but political will hasn\'t kept pace.',
    },
    {
      id: 'demo-n2',
      content: 'Interesting tension: Old environmental movement focused on stopping construction, but climate action now REQUIRES building (solar, wind, transit). NEPA becoming an obstacle.',
    },
    {
      id: 'demo-n3',
      content: 'Question to explore: How did industry denial campaigns affect public perception? Connection to tobacco tactics?',
    },
    {
      id: 'demo-n4',
      content: 'The 1.5 degree goal seems increasingly unrealistic - should I argue for adaptation alongside mitigation? Most sources suggest we need both now.',
    },
  ] as Note[],

  // Partial essay draft - approximately 2.5 paragraphs (stored as HTML for rich text editor)
  essay: `<h1>The Climate Reckoning: Why We Knew But Didn't Act</h1>

<h2>Introduction</h2>
<p>For decades, the scientific community has sounded the alarm on climate change, yet meaningful action remains elusive. As <em>The Atlantic's</em> coverage reveals, this isn't a failure of knowledge—it's a failure of <strong>collective will</strong>, complicated by deliberate misinformation campaigns and policy paralysis. This essay examines how industry denial, political inaction, and shifting environmental priorities have brought us to a critical crossroads in the fight against global warming.</p>

<h2>The Industry Denial Campaign</h2>
<p>The evidence of climate change has been clear since at least the 1980s. When NASA's top climate scientists testified before Congress in 1988 that global warming had already begun, the electricity industry didn't respond with innovation—they responded with <strong>denial</strong>. According to <em>The Atlantic</em>:</p>
<blockquote>The industry's leaders made a fateful decision: They began denying that climate change existed altogether.</blockquote>
<p>The Edison Electric Institute helped establish the Global Climate Coalition, one of the most notorious advocates of climate skepticism. This wasn't ignorance; it was <em>strategic obstruction</em>. The same playbook had worked for tobacco companies, and it worked for fossil fuel interests too. Even today, as one scientist admitted in <em>The Banality of Bad Faith Science</em>, pressure to downplay findings continues to shape how climate research gets published.</p>

<h2>The Consequences of Inaction</h2>
<p>Today, we face the consequences of those lost decades. The <strong>1.5 degree Celsius target</strong> that scientists once considered our safe limit is now, as one Atlantic article bluntly states, "all but dead." The math is sobering:</p>
<blockquote>Even if every nation managed to follow through on its stated emission reduction plans, the world would still be on track for nearly 3 degrees Celsius of global warming by 2100.</blockquote>
<p>The question is no longer whether we can prevent climate change—it's <strong>how much harm we're willing to accept</strong>. Meanwhile, isolated pockets of hope remain: a cold spot near the Galápagos continues to sustain populations of penguins, marine iguanas, and sea lions that would otherwise be unable to survive on the equator. But these refuges are exceptions, not the rule.</p>

<h2>The Path Forward</h2>
<p>What strikes me most is the cruel irony now facing environmentalists. The very laws designed to protect nature—like <strong>NEPA</strong>—have become obstacles to building the green infrastructure we desperately need. As the abundance movement argues, preserving nature in the era of global warming <em>requires</em> building new infrastructure: solar farms, wind turbines, energy pipelines, and dense urban housing that enables low-carbon lifestyles.</p>
<p>The old environmentalism said "stop building." The new environmentalism must say "build differently." Whether we can make this transition fast enough remains the defining question of our generation.</p>`,

  // Submitted essays for teacher review (Taylor Williams has submitted)
  submittedEssays: [
    {
      id: 'essay-demo-1',
      classroomId: 'climate-change',
      studentId: 'student-3',
      studentName: 'Taylor Williams',
      htmlContent: `<h1>The Climate Reckoning: Why We Knew But Didn't Act</h1>

<h2>Introduction</h2>
<p>For decades, the scientific community has sounded the alarm on climate change, yet meaningful action remains elusive. As <em>The Atlantic's</em> coverage reveals, this isn't a failure of knowledge—it's a failure of <strong>collective will</strong>, complicated by deliberate misinformation campaigns and policy paralysis. This essay examines how industry denial, political inaction, and shifting environmental priorities have brought us to a critical crossroads in the fight against global warming.</p>

<h2>The Industry Denial Campaign</h2>
<p>The evidence of climate change has been clear since at least the 1980s. When NASA's top climate scientists testified before Congress in 1988 that global warming had already begun, the electricity industry didn't respond with innovation—they responded with <strong>denial</strong>. According to <em>The Atlantic</em>:</p>
<blockquote>The industry's leaders made a fateful decision: They began denying that climate change existed altogether.</blockquote>
<p>The Edison Electric Institute helped establish the Global Climate Coalition, one of the most notorious advocates of climate skepticism. This wasn't ignorance; it was <em>strategic obstruction</em>. The same playbook had worked for tobacco companies, and it worked for fossil fuel interests too. Even today, as one scientist admitted in <em>The Banality of Bad Faith Science</em>, pressure to downplay findings continues to shape how climate research gets published.</p>

<h2>The Consequences of Inaction</h2>
<p>Today, we face the consequences of those lost decades. The <strong>1.5 degree Celsius target</strong> that scientists once considered our safe limit is now, as one Atlantic article bluntly states, "all but dead." The math is sobering:</p>
<blockquote>Even if every nation managed to follow through on its stated emission reduction plans, the world would still be on track for nearly 3 degrees Celsius of global warming by 2100.</blockquote>
<p>The question is no longer whether we can prevent climate change—it's <strong>how much harm we're willing to accept</strong>. Meanwhile, isolated pockets of hope remain: a cold spot near the Galápagos continues to sustain populations of penguins, marine iguanas, and sea lions that would otherwise be unable to survive on the equator. But these refuges are exceptions, not the rule.</p>

<h2>The Path Forward</h2>
<p>What strikes me most is the cruel irony now facing environmentalists. The very laws designed to protect nature—like <strong>NEPA</strong>—have become obstacles to building the green infrastructure we desperately need. As the abundance movement argues, preserving nature in the era of global warming <em>requires</em> building new infrastructure: solar farms, wind turbines, energy pipelines, and dense urban housing that enables low-carbon lifestyles.</p>
<p>The old environmentalism said "stop building." The new environmentalism must say "build differently." Whether we can make this transition fast enough remains the defining question of our generation.</p>`,
      submittedAt: '2026-01-30T14:30:00Z',
    },
  ],
}

// Helper to get demo state by day
export function getDemoState(day: 'day1' | 'day30') {
  return day === 'day1' ? DAY_1_STATE : DAY_30_STATE
}

// Export for backward compatibility with existing code
export const DEMO_DATA = {
  day1: DAY_1_STATE,
  day30: DAY_30_STATE,
}
