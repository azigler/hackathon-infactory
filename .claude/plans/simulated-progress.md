# Simulated Progress States for Demo

This document defines what each demo state should display across teacher and student views. The demo bar allows switching between these states to show the full user journey in a 3-minute demo.

---

## Demo Bar Functionality

A persistent bar at the top of every page that provides:
- **Role Toggle**: Switch between Teacher and Student view instantly
- **Time Toggle**: Switch between "Day 0" (fresh start) and "Final Day" (accumulated work)
- **Visual indicator**: Shows current mode clearly

---

## State Definitions

### Day 0 - Teacher View

**Dashboard (`/teacher`)**
- Shows 3 curated topic packages (Climate Change, AI, Technology & Society)
- "Your Active Classrooms" section is empty
- Message: "No active classrooms yet. Select a topic above to create one."

**After Setup (`/teacher/setup/:topicId`)**
- Can configure and launch a classroom
- On launch, classroom appears in "Active Classrooms" with share code

**Review (`/teacher/review/:classroomId`)**
- Shows classroom info with share code (e.g., "CLIMATE-2024")
- Student list is empty or shows "0 students joined"
- Stats: 0 students, 0 researching, 0 writing, 0 submitted
- "Most Engaged Sources" section empty

---

### Day 0 - Student View

**Dashboard (`/student`)**
- Classroom code input empty
- "Your Classrooms" section empty
- Demo mode button available

**Research Workspace (`/student/classroom/:id`)**
- Articles loaded from API (real data)
- Right panel shows:
  - Highlights: 0 (with prompt "No highlights yet. Select text in an article to highlight.")
  - Notes: 0 (with empty state message)
- No article selected initially (show "Select an article from the left to begin reading")

**Writing Station (`/student/classroom/:id/write`)**
- Essay textarea empty
- Word count: 0
- Research panel shows 0 highlights, 0 notes
- Socratic AI not triggered yet (button available: "Get a thinking prompt")

---

### Final Day - Teacher View

**Dashboard (`/teacher`)**
- Same 3 curated topic packages
- "Your Active Classrooms" shows 1 active classroom:
  - Topic: "Climate Change: Science and Society"
  - Share Code: CLIMATE-2024
  - Students: 3
  - Status summary: 1 researching, 1 writing, 1 submitted

**Review (`/teacher/review/:classroomId`)**
- Share code prominently displayed
- Stats overview:
  - 3 students total
  - 1 researching
  - 1 writing
  - 1 submitted

- Student progress table:
  | Student | Articles | Highlights | Notes | Essay Progress | Status |
  |---------|----------|------------|-------|----------------|--------|
  | Alex Chen | 5 | 12 | 8 | 75% | writing |
  | Jordan Smith | 3 | 6 | 4 | 30% | researching |
  | Taylor Williams | 7 | 18 | 15 | 100% | submitted |

- Most Engaged Sources:
  1. "A Sicker, Poorer, and Less Abundant World" - 24 highlights
  2. "Scientists Are Moving Forests North" - 18 highlights
  3. "What the Climate Establishment Missed" - 12 highlights

---

### Final Day - Student View

**Dashboard (`/student`)**
- "Your Classrooms" shows 1 classroom:
  - Climate Change: Science and Society
  - Last accessed: Today
  - Progress: 75%

**Research Workspace (`/student/classroom/:id`)**
- Articles loaded from API
- First article auto-selected
- Right panel shows accumulated research:

  **Highlights (5):**
  1. "The world is on track to warm by about 2.5 degrees Celsius by 2100" - from "A Sicker, Poorer, and Less Abundant World"
  2. "Scientists are now actively moving entire forests northward" - from "Scientists Are Moving Forests North"
  3. "The climate establishment missed the acceleration of tipping points" - from "What the Climate Establishment Missed"
  4. "Adaptation is no longer optional—it's survival" - from "A Sicker, Poorer, and Less Abundant World"
  5. "The IPCC's latest report calls for immediate, unprecedented action" - from various

  **Notes (4):**
  1. "Key theme: urgency vs. incremental change"
  2. "Compare forest migration approach to other geoengineering proposals"
  3. "Look for specific policy recommendations across articles"
  4. "The tension between scientific consensus and political action"

**Writing Station (`/student/classroom/:id/write`)**
- Essay in progress (~300 words):
  ```
  The Climate Imperative: Why Incremental Change Is No Longer Enough

  In the pages of The Atlantic, a clear and troubling picture emerges: our planet is warming faster than predicted, and the window for meaningful action is rapidly closing. As one article starkly notes, "The world is on track to warm by about 2.5 degrees Celsius by 2100"—a figure that would trigger cascading failures across ecosystems and human systems alike.

  What strikes me most in reviewing these sources is the growing disconnect between scientific urgency and political incrementalism. The IPCC's latest reports call for "immediate, unprecedented action," yet global emissions continue to rise. This isn't a failure of science—it's a failure of imagination and will.

  Consider the scientists who are now "actively moving entire forests northward" in anticipation of climate zones shifting faster than trees can naturally migrate. This is adaptation at its most desperate...
  ```

- Word count: ~180 words shown, essay continues
- Socratic AI popup visible with contextual question:
  "You've cited scientific urgency as a key theme. What counterarguments do climate policy skeptics make, and how would you address them using your sources?"

---

## Demo Flow Script

### 3-Minute Demo Walkthrough

**0:00-0:30 - Teacher Setup (Day 0)**
1. Start on Login page, click "Teacher"
2. Show dashboard with curated topics
3. Click "Climate Change" topic
4. Configure classroom, click "Launch"
5. Show share code generated

**0:30-1:30 - Student Research (Day 0 → Final Day transition)**
1. Toggle to Student view
2. Enter classroom code (or click demo)
3. Show articles loading from real API
4. Click an article, read briefly
5. Select text, create a highlight
6. Add a note
7. **Toggle to Final Day** to show accumulated research
8. Show 5 highlights and 4 notes accumulated

**1:30-2:30 - Student Writing (Final Day)**
1. Click "Open Writing Station"
2. Show essay in progress with 180+ words
3. Show research panel with highlights/notes on left
4. **Trigger Socratic AI** - show question-only prompt
5. Dismiss prompt, continue writing

**2:30-3:00 - Teacher Review (Final Day)**
1. Toggle to Teacher view
2. Show review dashboard with 3 students
3. Highlight the student who submitted
4. Show most engaged sources
5. End with "process visibility" message

---

## Implementation Notes

### Demo State Storage

Use Zustand store to manage demo state:
```typescript
interface DemoState {
  demoMode: 'day0' | 'final'
  viewRole: 'teacher' | 'student'
  setDemoMode: (mode: 'day0' | 'final') => void
  setViewRole: (role: 'teacher' | 'student') => void
}
```

### Mock Data for Final Day

Store simulated progress data in a separate file:
- `src/lib/mock/final-day-data.ts`

Contains:
- Mock student list with progress
- Mock highlights array
- Mock notes array
- Mock essay content
- Mock classroom with share code

### Component Behavior

Each component should check `demoMode` and render accordingly:
- Day 0: Empty states, fresh starts
- Final Day: Populated with mock accumulated data

### Demo Bar Component

`src/components/DemoBar.tsx`:
- Fixed position at top of viewport
- Semi-transparent background
- Role toggle (Teacher/Student buttons)
- Time toggle (Day 0 / Final Day buttons)
- Current state indicator
- Collapsible for cleaner demo presentation

---

## Beads to Create

1. **Create DemoBar component** - Persistent demo controls
2. **Add demo state to Zustand store** - Track demo mode and role
3. **Create mock final-day data file** - Simulated accumulated work
4. **Update TeacherDashboard for demo states** - Show/hide active classrooms
5. **Update TeacherReview for demo states** - Populated vs empty student data
6. **Update StudentDashboard for demo states** - Show classroom history
7. **Update ResearchWorkspace for demo states** - Pre-populated highlights/notes
8. **Update WritingStation for demo states** - Essay in progress + Socratic popup
9. **Add demo routing** - Role toggle navigates to correct route
10. **Polish demo transitions** - Smooth switching between states
