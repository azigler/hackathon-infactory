// Mock data for "Final Day" demo state
// Represents accumulated student work over the assignment period

import type { Highlight, Note } from '@/types'

export const FINAL_DAY_DATA = {
  // Simulated highlights from research
  highlights: [
    {
      id: 'h1',
      articleId: 'climate-1',
      articleTitle: 'A Sicker, Poorer, and Less Abundant World',
      text: 'The world is on track to warm by about 2.5 degrees Celsius by 2100, a temperature rise that would trigger cascading failures across ecosystems.',
    },
    {
      id: 'h2',
      articleId: 'climate-2',
      articleTitle: 'Scientists Are Moving Forests North',
      text: 'Scientists are now actively moving entire forests northward, transplanting seedlings hundreds of miles from their native range in anticipation of climate zones shifting.',
    },
    {
      id: 'h3',
      articleId: 'climate-3',
      articleTitle: 'What the Climate Establishment Missed',
      text: 'The climate establishment consistently underestimated the acceleration of tipping points, leading to policy responses that were always one step behind reality.',
    },
    {
      id: 'h4',
      articleId: 'climate-1',
      articleTitle: 'A Sicker, Poorer, and Less Abundant World',
      text: 'Adaptation is no longer optional—it is survival. The question is no longer whether to act, but whether we can act fast enough.',
    },
    {
      id: 'h5',
      articleId: 'climate-4',
      articleTitle: 'The IPCC Report: What You Need to Know',
      text: 'The IPCC\'s latest report calls for immediate, unprecedented action across all sectors of the global economy.',
    },
  ] as Highlight[],

  // Simulated notes from research
  notes: [
    {
      id: 'n1',
      content: 'Key theme: urgency vs. incremental change — most articles emphasize that gradual policy shifts are no longer sufficient.',
    },
    {
      id: 'n2',
      content: 'Compare forest migration approach to other geoengineering proposals. Is assisted migration fundamentally different from more controversial interventions?',
    },
    {
      id: 'n3',
      content: 'Look for specific policy recommendations across articles. What concrete steps do the authors propose?',
    },
    {
      id: 'n4',
      content: 'The tension between scientific consensus and political action is a recurring thread. Scientists know what needs to happen; politics prevents it.',
    },
  ] as Note[],

  // Simulated essay in progress
  essay: `The Climate Imperative: Why Incremental Change Is No Longer Enough

In the pages of The Atlantic, a clear and troubling picture emerges: our planet is warming faster than predicted, and the window for meaningful action is rapidly closing. As one article starkly notes, "The world is on track to warm by about 2.5 degrees Celsius by 2100"—a figure that would trigger cascading failures across ecosystems and human systems alike.

What strikes me most in reviewing these sources is the growing disconnect between scientific urgency and political incrementalism. The IPCC's latest reports call for "immediate, unprecedented action," yet global emissions continue to rise. This isn't a failure of science—it's a failure of imagination and will.

Consider the scientists who are now "actively moving entire forests northward" in anticipation of climate zones shifting faster than trees can naturally migrate. This is adaptation at its most desperate—and its most innovative. It represents a new paradigm: rather than simply reducing harm, we must actively reshape our relationship with the natural world.

The articles I've studied suggest three critical insights:

First, the climate establishment has consistently underestimated the pace of change. Tipping points that were projected for mid-century are arriving now. The assumptions underlying our policies are outdated before the policies are even implemented.

Second, adaptation is no longer optional—it is survival. We cannot prevent all climate impacts; we must prepare for them while still working to limit further warming.

Third, `,

  // Mock classroom for teacher view
  classroom: {
    id: 'climate-classroom-1',
    topic: 'Climate Change: Science and Society',
    shareCode: 'CLIMATE-2024',
    assignment: 'Analyze how climate change coverage in The Atlantic has evolved. What perspectives are represented? What solutions are proposed?',
    createdAt: '2024-01-28',
    studentCount: 3,
  },

  // Mock student progress for teacher review
  students: [
    {
      id: 's1',
      name: 'Alex Chen',
      articlesRead: 5,
      highlights: 12,
      notes: 8,
      essayProgress: 75,
      status: 'writing' as const,
    },
    {
      id: 's2',
      name: 'Jordan Smith',
      articlesRead: 3,
      highlights: 6,
      notes: 4,
      essayProgress: 30,
      status: 'researching' as const,
    },
    {
      id: 's3',
      name: 'Taylor Williams',
      articlesRead: 7,
      highlights: 18,
      notes: 15,
      essayProgress: 100,
      status: 'submitted' as const,
    },
  ],

  // Most engaged sources
  popularSources: [
    { title: 'A Sicker, Poorer, and Less Abundant World', author: 'Robinson Meyer', highlights: 24 },
    { title: 'Scientists Are Moving Forests North', author: 'Marina Koren', highlights: 18 },
    { title: 'What the Climate Establishment Missed', author: 'Derek Thompson', highlights: 12 },
  ],
}
