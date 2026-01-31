# UI Explainer - The Beat Demo Pages

This document explains the page structure and what needs to be implemented for each page in the demo flow.

---

## Route Structure

```
/                                    → LoginPage
/teacher                             → TeacherDashboard
/teacher/setup/:topicId              → ClassroomSetup
/teacher/review/:classroomId         → TeacherReview
/student                             → StudentDashboard
/student/classroom/:classroomId      → ResearchWorkspace
/student/classroom/:classroomId/write → WritingStation
```

---

## Page-by-Page Breakdown

### 1. LoginPage (`/`)
**File:** `src/pages/LoginPage.tsx`

**Purpose:** Entry point where users select their role (teacher or student).

**Current State:** Fully styled, functional navigation.

**What's Done:**
- Atlantic-branded hero header
- Two role selection cards (Teacher / Student)
- Demo mode callout
- Navigation to respective dashboards

**What's Needed:**
- Nothing for demo MVP

---

### 2. TeacherDashboard (`/teacher`)
**File:** `src/pages/teacher/TeacherDashboard.tsx`

**Purpose:** Teacher's home base. Browse curated newsroom topics and see active classrooms.

**Current State:** Layout complete with mock data.

**What's Done:**
- Page layout with header/title
- Topic cards with metadata (date range, article count, grade level)
- Hover states and navigation to setup
- "Active Classrooms" section placeholder

**What's Needed:**
- **API Integration:** Replace `MOCK_TOPICS` with real data from Infactory API
- **Topic Discovery:** Need to explore API to find good topic clusters
- **Active Classrooms:** Hook up to state/storage to show teacher's created classrooms

---

### 3. ClassroomSetup (`/teacher/setup/:topicId`)
**File:** `src/pages/teacher/ClassroomSetup.tsx`

**Purpose:** Teacher configures a new classroom from a selected topic.

**Current State:** Two-column layout with configuration options.

**What's Done:**
- Topic overview sidebar (description, date range, sample sources)
- Suggested assignment selection (click to populate)
- Custom assignment textarea
- Date range scope configuration
- Keyword exclusion input
- Launch button

**What's Needed:**
- **API Integration:** Fetch real topic details and sample articles
- **Classroom Creation:** API call to create classroom, get share code
- **State Management:** Store classroom config in Zustand or persist
- **Validation:** Ensure assignment prompt is provided before launch

---

### 4. TeacherReview (`/teacher/review/:classroomId`)
**File:** `src/pages/teacher/TeacherReview.tsx`

**Purpose:** Teacher monitors student progress and engagement. **(Stretch goal)**

**Current State:** Full layout with mock data.

**What's Done:**
- Classroom info header with share code
- Stats overview cards (total students, status breakdown)
- Student progress table with columns:
  - Articles read, highlights, notes
  - Essay progress bar
  - Status badge (researching/writing/submitted)
- Popular sources section

**What's Needed:**
- **Real Data:** Student progress from state/backend
- **View Details:** Modal or panel to see individual student's research trail
- **Submission View:** Display submitted essays

---

### 5. StudentDashboard (`/student`)
**File:** `src/pages/student/StudentDashboard.tsx`

**Purpose:** Student entry point to join a classroom.

**Current State:** Centered form with classroom code input.

**What's Done:**
- Classroom code input (styled, uppercase formatting)
- "Enter Classroom" button
- Demo mode quick access button
- "Your Classrooms" history section (placeholder)

**What's Needed:**
- **Code Validation:** Verify classroom code exists (for demo, any code works)
- **History:** Store/retrieve student's previously joined classrooms

---

### 6. ResearchWorkspace (`/student/classroom/:classroomId`)
**File:** `src/pages/student/ResearchWorkspace.tsx`

**Purpose:** Core student experience. Three-panel layout for researching sources.

**Current State:** Full three-panel layout with interactive features.

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│ Header: Classroom title, highlight/note count, Write button  │
├──────────────────────────────────────────────────────────────┤
│ Assignment Banner: Shows the assignment prompt               │
├──────────┬─────────────────────────────┬────────────────────┤
│ Sources  │     Reading Pane            │  Research Panel    │
│ (280px)  │     (flex-1)                │  (280px)           │
│          │                             │                    │
│ List of  │  Article title              │  Highlights        │
│ articles │  Author, date               │  - quoted text     │
│          │                             │  - source          │
│ Click to │  Full article content       │                    │
│ select   │  (selectable text)          │  Notes             │
│          │                             │  - note cards      │
│          │                             │  - add note input  │
└──────────┴─────────────────────────────┴────────────────────┘
```

**What's Done:**
- Three-panel responsive layout
- Source list with selection state
- Reading pane with article display
- Text selection → highlight capture
- Notes panel with add functionality
- Navigation to Writing Station

**What's Needed:**
- **API Integration:** Fetch real articles from Infactory based on classroom scope
- **Persist State:** Save highlights/notes to Zustand store (currently local state)
- **Highlight UX:** Visual highlight rendering in article text
- **Better Selection:** Handle multi-paragraph selections, show highlight tooltip

---

### 7. WritingStation (`/student/classroom/:classroomId/write`)
**File:** `src/pages/student/WritingStation.tsx`

**Purpose:** Where students write their essay with access to their research and Socratic AI guidance.

**Current State:** Two-panel layout with Socratic popup.

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│ Header: Back button, title, word count, Save/Submit buttons  │
├──────────────────────────────────────────────────────────────┤
│ Assignment Banner                                            │
├─────────────────────────┬────────────────────────────────────┤
│ Research Panel (384px)  │  Writing Area (flex-1)             │
│                         │                                    │
│ Highlights              │  ┌────────────────────────────┐    │
│ - quoted + source       │  │                            │    │
│                         │  │  Textarea for essay        │    │
│ Notes                   │  │  (serif font, large)       │    │
│ - note cards            │  │                            │    │
│                         │  │                            │    │
│ Link back to research   │  └────────────────────────────┘    │
│                         │                                    │
│                         │  ┌─────────────────────────┐       │
│                         │  │ 🤔 Socratic Prompt      │       │
│                         │  │ (bottom-right popup)    │       │
│                         │  └─────────────────────────┘       │
└─────────────────────────┴────────────────────────────────────┘
```

**What's Done:**
- Two-panel layout
- Research materials sidebar (highlights + notes from mock data)
- Large textarea for essay writing
- Word count display
- Socratic AI popup with dismiss
- "Get thinking prompt" button for demo triggering

**What's Needed:**
- **State Integration:** Pull real highlights/notes from Zustand store
- **Essay Persistence:** Save draft to state, auto-save
- **Socratic AI Logic:**
  - Contextual prompts based on what student has highlighted/written
  - Integration with Claude API for dynamic questions
  - Timing logic (when to show prompts)
- **Submit Flow:** Confirmation, mark as submitted, notify teacher view

---

## Shared Components

### PageLayout (`src/components/layout/PageLayout.tsx`)
Reusable page wrapper with:
- Header with logo, subtitle, role badge
- Optional back link
- Page title section
- Footer

Used by: TeacherDashboard, ClassroomSetup, TeacherReview, StudentDashboard

**Not used by:** LoginPage, ResearchWorkspace, WritingStation (these have custom full-screen layouts)

---

## State Management Needs

The app needs to track:

1. **User State**
   - Current role (teacher/student)
   - User ID (mock for demo)

2. **Teacher State**
   - Created classrooms
   - Selected topic for setup

3. **Student State**
   - Current classroom
   - Highlights (array of {id, text, articleId, position})
   - Notes (array of {id, text, highlightId?})
   - Essay content
   - Submission status

4. **Classroom State**
   - Topic/scope configuration
   - Available articles (filtered from API)
   - Student list (for teacher view)

The Zustand store skeleton exists at `src/lib/stores/app-store.ts` but needs expansion.

---

## API Integration Points

| Page | API Calls Needed |
|------|------------------|
| TeacherDashboard | `GET /topics` - list curated topic packages |
| ClassroomSetup | `GET /topics/:id` - topic details + sample articles |
| ClassroomSetup | `POST /classrooms` - create new classroom |
| ResearchWorkspace | `GET /classrooms/:id/articles` - bounded article list |
| ResearchWorkspace | `GET /articles/:id` - full article content |
| WritingStation | `POST /classrooms/:id/submit` - submit essay |
| TeacherReview | `GET /classrooms/:id/students` - student progress |

All API calls go through Infactory. See `src/lib/api/infactory.ts` for the client stub.

---

## Demo Flow Checklist

For a successful 3-minute demo:

1. **Teacher Login** → Click "Teacher" card
2. **Topic Selection** → Click "The Space Race" topic card
3. **Classroom Config** → Select suggested assignment, click "Launch"
4. **Switch to Student** → Use back navigation, click "Student"
5. **Join Classroom** → Enter code or click "Demo Classroom"
6. **Research** → Click article, read, highlight text, add note
7. **Writing** → Click "Open Writing Station", start typing
8. **Socratic Moment** → Trigger prompt, show question-only AI
9. **(Stretch) Teacher Review** → Show student progress dashboard

Each page is designed to be demo-able with mock data if API isn't ready.
