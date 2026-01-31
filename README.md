# The Beat

**Atlantic Newsroom for the Classroom**

A hackathon project for The Atlantic + Infactory Hackathon (January 2026)

---

## The Pitch

> *"In 2026, AI makes it trivially easy for students to get answers without thinking. We built a tool that flips the script—AI helps teachers create the conditions for learning, not give students answers."*

**The Beat** transforms The Atlantic's 167-year archive into a powerful educational platform. Teachers curate bounded research environments where students develop critical thinking skills through guided journalism exploration—no shortcuts, no copy-paste answers, just genuine learning.

### The Problem

Teachers face an impossible position:
- AI makes shortcuts trivially easy
- Banning AI is a losing battle
- The skills students need—evaluating sources, synthesizing perspectives, constructing arguments—are exactly what AI shortcuts destroy

### The Solution

A three-layer platform:

| Layer | Who | What They Do |
|-------|-----|--------------|
| **Atlantic Editorial** | The Atlantic | Curates topic packages from the archive |
| **Teacher** | Educators | Creates classrooms, customizes sources, sets assignments |
| **Student** | Learners | Researches, highlights, takes notes, writes essays |

### Key Differentiators

1. **Teacher Empowerment** — AI helps teachers curate; students do the thinking
2. **Bounded Worlds** — No shortcuts to the internet; work within curated sources
3. **Socratic AI** — Asks questions only, never gives answers
4. **Process Visibility** — Teachers see the research journey, not just final essays
5. **Citation Integrity** — Students must properly cite sources before submission

---

## Demo Flow

The demo showcases a complete educational workflow in two modes: **Day 1** (fresh start) and **Day 30** (research complete).

### Teacher Flow

```
Login → Browse Topics → Create Classroom → Customize Sources → Share Code → Review Student Work
```

1. **Dashboard** — Browse curated topic packages (Climate Change, AI, etc.)
2. **Classroom Setup** — Configure assignment prompt, citation style, date filters
3. **Article Curation** — Search The Atlantic archive, add/remove articles
4. **Share** — Generate classroom code for students (e.g., `CLIMATE-2026`)
5. **Review** — Monitor student progress, read submitted essays

### Student Flow

```
Join Classroom → Research Articles → Highlight & Note → Write Essay → Review Citations → Submit
```

1. **Join** — Enter classroom code shared by teacher
2. **Research** — Browse curated articles with sticky highlighter tool
3. **Annotate** — Highlight passages, take notes (persisted automatically)
4. **Write** — Essay editor with highlights/notes sidebar
5. **Citations** — Review and write proper citations (MLA/APA/Chicago)
6. **Submit** — Final submission with teacher notification

### Demo Controls

A floating demo bar (visible in dev mode or with `?demo=true`) lets you:
- Toggle between **Teacher** and **Student** views
- Switch between **Day 1** (empty state) and **Day 30** (populated data)
- Jump to **Atlantic View** (publisher dashboard)

---

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Open in browser
open http://localhost:5173
```

### Environment Setup

```bash
# Create .env.local
echo "VITE_INFACTORY_API_KEY=your_key_here" > .env.local
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Production build |
| `bun run typecheck` | TypeScript validation |
| `bun run test` | Run Vitest tests |
| `bun run lint` | ESLint checks |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Bun |
| Build | Vite |
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS |
| State | Zustand (with localStorage persistence) |
| Editor | Tiptap (rich text) |
| Export | docx (Word documents) |
| API | Infactory (The Atlantic archive) |

### Why This Stack?

- **React + TypeScript** — Complex multi-panel UI with type safety
- **Tailwind** — Rapid prototyping with Atlantic-native design system
- **Zustand** — Simpler than Redux, with built-in persistence
- **Bun + Vite** — Fast development, modern tooling

---

## Project Structure

```
src/
├── components/           # Shared UI components
│   ├── DemoBar.tsx      # Demo controls overlay
│   └── ui/              # Base components
├── pages/
│   ├── teacher/         # Teacher dashboard & management
│   │   ├── TeacherDashboard.tsx
│   │   ├── ClassroomSetup.tsx
│   │   ├── ClassroomCustomize.tsx
│   │   ├── TeacherReview.tsx
│   │   └── EssayReviewPanel.tsx
│   ├── student/         # Student workspace
│   │   ├── StudentDashboard.tsx
│   │   ├── ResearchWorkspace.tsx
│   │   ├── WritingStation.tsx
│   │   ├── CitationReview.tsx
│   │   └── SubmissionConfirmation.tsx
│   └── atlantic/        # Publisher view
│       └── AtlanticDashboard.tsx
├── lib/
│   ├── api/             # Infactory API client
│   ├── stores/          # Zustand state management
│   └── services/        # Citation validation, etc.
├── data/                # Curated article content
│   ├── climate-change-articles.ts
│   ├── ai-articles.ts
│   └── demo-state.ts
└── types/               # TypeScript definitions
```

---

## Design System

The UI is designed to feel native to The Atlantic brand.

### Color Palette

| Name | Usage |
|------|-------|
| `atlantic-charcoal` | Primary text, headers |
| `atlantic-gold` | Accent color, buttons, highlights |
| `atlantic-cream` | Page backgrounds |
| `atlantic-pearl` | Borders, dividers |
| `atlantic-slate` | Body text |

### Typography

- **Headings** — Cormorant Garamond (serif)
- **Body** — Libre Franklin (sans-serif)

---

## Planning & Reference Files

This project was built with extensive planning and research documentation.

### Planning Documents

Located in `.claude/plans/`:

| File | Description |
|------|-------------|
| `idea.md` | Core product specification and vision |
| `conversation-log.md` | Full brainstorming session with context |
| `ui-explainer.md` | UI/UX design decisions and flows |
| `api-exploration.md` | Infactory API research and findings |
| `topic-research.md` | Topic selection analysis |
| `simulated-progress.md` | Day 1 vs Day 30 demo state design |
| `selected-data.md` | Curated article selection rationale |

### Reference Materials

Located in `.claude/ref/`:

| File | Description |
|------|-------------|
| `event-description.md` | Hackathon event details |
| `competitor-ideas.md` | Analysis of other team approaches |
| `ideas-from-the-atlantic.md` | Atlantic team's suggested directions |
| `verge-interview-with-the-atlantic-ceo.md` | Context on Atlantic's AI strategy |

### Data Files

Located in `data/`:

| File | Description |
|------|-------------|
| `atlantic_hackathon_articles.json` | Full article dataset |
| `articles-clean.json` | Processed article data |

---

## Development Process

This project was built during a single-day hackathon using AI-assisted development with Claude Code. The development followed an iterative approach:

1. **Vision & Planning** — Extensive brainstorming captured in planning docs
2. **API Exploration** — Understanding Infactory's Atlantic archive API
3. **Core UI** — Teacher and student dashboards with multi-panel layouts
4. **Research Tools** — Highlighting, note-taking, article browsing
5. **Writing Station** — Rich text editor with research sidebar
6. **Citation System** — Format validation (MLA/APA/Chicago) with hints
7. **Demo Polish** — Day 1/Day 30 state switching, localStorage persistence
8. **Custom Articles** — Teacher-curated articles alongside defaults

### Task Tracking

The project uses [beads_rust](https://github.com/Dicklesworthstone/beads_rust) for issue tracking. Issues are stored in `.beads/` and tracked in git.

```bash
# View ready issues
br ready

# Check project status
bv --robot-triage
```

---

## Credits

**Created by Andrew**

Built at the Hacks/Hackers + The Atlantic + Infactory Hackathon, January 2026.

### Acknowledgments

- **The Atlantic** — For the incredible 167-year archive and product mentorship
- **Infactory** — For the AI-powered archive API and technical support
- **Hacks/Hackers** — For organizing the event
- **Claude Code** — AI-assisted development partner

---

## License

This project was created for the Atlantic + Infactory Hackathon. All rights reserved.

The Atlantic archive content is provided through Infactory's API for hackathon purposes only.

---

<p align="center">
  <em>"AI should help teachers create the conditions for learning, not give students answers."</em>
</p>
