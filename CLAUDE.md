# The Beat - Atlantic Newsroom for the Classroom

> A hackathon project for The Atlantic + Infactory: Empowering teachers to create bounded research environments where students develop critical thinking skills.

## Quick Start

```bash
bun install
bun run dev
```

## Agent Instructions

**NEVER run the dev server (`bun run dev`).** The user will run it themselves. Only run `bun run typecheck` or `bun run build` to verify code compiles.

**Only use `bun` for package management and running scripts.** Do not use npm, pnpm, yarn, or npx.

## Tech Stack

- **Runtime**: Bun
- **Build Tool**: Vite
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand (lightweight, simple)
- **API**: Infactory API (The Atlantic archive)

### Why This Stack?

- **React + TypeScript**: Complex UI with multiple panels (reading pane, annotations, writing station) benefits from component composition and type safety
- **Tailwind**: Rapid prototyping for hackathon speed
- **Zustand**: Simpler than Redux, sufficient for our state needs (highlights, notes, user context)
- **Bun + Vite**: Fast dev server, modern tooling

## Project Structure

```
src/
├── components/           # Shared UI components
│   ├── ui/              # Base components (Button, Modal, Input)
│   └── layout/          # Layout components (Sidebar, Panel)
├── features/
│   ├── auth/            # Mock auth (teacher/student login)
│   ├── teacher/         # Teacher dashboard, config screens
│   │   ├── TopicBrowser.tsx
│   │   ├── ClassroomConfig.tsx
│   │   └── ReviewDashboard.tsx
│   ├── student/         # Student workspace
│   │   ├── SourceBrowser.tsx
│   │   ├── ReadingPane.tsx
│   │   ├── AnnotationTools.tsx
│   │   └── WritingStation.tsx
│   └── socratic/        # Socratic AI tutor
│       └── SocraticTutor.tsx
├── hooks/               # Custom React hooks
├── lib/
│   ├── api/            # Infactory API client
│   └── stores/         # Zustand stores
├── types/              # TypeScript types
└── App.tsx
```

## Environment Variables

```bash
# .env.local
INFACTORY_API_KEY=your_key_here
VITE_API_BASE_URL=https://atlantichack-api.infactory.ai/demo/
```

## Demo Flow (3 minutes)

### Scene 1: Teacher Login
- Click login → See dashboard with curated newsroom topics

### Scene 2: Teacher Configures Classroom
- Select topic (e.g., "The Space Race: 1957-1969")
- Configure: exclude dates, set assignment prompt
- Share with students

### Scene 3: Student Research
- Browse bounded sources
- Open articles in reading pane
- Highlight passages, take notes

### Scene 4: Writing Station
- Side panel: collected highlights/notes
- Main panel: essay draft
- Socratic AI asks challenging questions

### Scene 5: Teacher Review (stretch)
- See engagement dashboard
- View student research trails

## Agent Task Assignments

### Agent 1: API & Data Layer
- [ ] Explore Infactory API endpoints
- [ ] Create API client with proper types
- [ ] Identify 1-2 good demo topics with rich coverage
- [ ] Set up mock data for offline development

### Agent 2: Teacher Features
- [ ] Login screen (mock, no real auth)
- [ ] Topic browser with curated newsroom packages
- [ ] Classroom configuration modal
- [ ] Basic review dashboard (stretch)

### Agent 3: Student Features
- [ ] Source browser (list of available articles)
- [ ] Reading pane with article display
- [ ] Highlight and annotation tools
- [ ] Notes panel

### Agent 4: Writing & AI
- [ ] Writing station with split panel
- [ ] Notes/highlights sidebar in writing view
- [ ] Socratic AI integration (question-only prompts)
- [ ] Submit functionality

### Agent 5: Polish & Integration
- [ ] Consistent styling across all views
- [ ] Navigation flow between screens
- [ ] Demo data and happy path testing
- [ ] Final polish for presentation

## Key Design Principles

1. **Teacher empowerment**: AI helps teachers curate; students do the thinking
2. **Bounded worlds**: Students work within curated sources, no shortcuts to the internet
3. **Socratic AI**: Only asks questions, never gives answers
4. **Process visibility**: Teachers see the journey, not just the destination

## Style Guide - The Atlantic Native Design

**IMPORTANT**: All UI must look native to The Atlantic. Use these design tokens consistently.

### Color Palette (Tailwind classes)

| Color | Class | Hex | Usage |
|-------|-------|-----|-------|
| Charcoal | `atlantic-charcoal` | #1a1a1a | Primary text, headers, dark backgrounds |
| Slate | `atlantic-slate` | #2d3436 | Body text, secondary content |
| Stone | `atlantic-stone` | #636e72 | Meta text, labels, placeholders |
| Silver | `atlantic-silver` | #b2bec3 | Subtle text, disabled states |
| Pearl | `atlantic-pearl` | #dfe6e9 | Borders, dividers, tag backgrounds |
| Cream | `atlantic-cream` | #fafafa | Page background |
| White | `atlantic-white` | #ffffff | Card backgrounds |
| Gold | `atlantic-gold` | #c9a227 | **Primary accent** - buttons, links, highlights |
| Gold Light | `atlantic-gold-light` | #e8d490 | Accent borders, summary sections |
| Burgundy | `atlantic-burgundy` | #6c2438 | Error states, alerts |

### Typography

- **Headings**: `font-serif` (Cormorant Garamond) - elegant, editorial feel
- **Body text**: `font-sans` (Libre Franklin) - clean, readable
- **Display text**: Large headings use `font-serif text-5xl font-bold`
- **Section titles**: `font-serif text-2xl font-semibold`
- **Labels**: `text-xs uppercase tracking-wider font-semibold text-atlantic-stone`

### Component Classes (defined in index.css)

```jsx
// Buttons
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-secondary">Secondary Action</button>

// Cards
<div className="card">White card with shadow</div>
<div className="card card-hover">Card with hover effect</div>

// Article cards (gold left border)
<div className="article-card">Article with gold accent</div>

// Form elements
<label className="label">Label Text</label>
<input className="input" placeholder="Input field" />

// Meta tags/badges
<span className="meta-tag">Category</span>

// Year badge (for timelines)
<span className="year-badge">2024</span>

// Summary/highlight section
<div className="summary-card">Important highlighted content</div>

// States
<div className="placeholder">Italic placeholder text</div>
<div className="spinner"></div>
<div className="error-message">Error message</div>
```

### Design Patterns

1. **Card Layout**: White background, pearl border, subtle shadow (`shadow-card`)
2. **Article Cards**: Add gold left border (`border-l-4 border-l-atlantic-gold`)
3. **Hover States**: Slight translate + stronger shadow + gold border
4. **Section Headers**: Serif font + gold accent + pearl divider line
5. **Accent Pattern**: Use `✦` character with gold color for decorative elements
6. **Max Width**: Content constrained to `max-w-5xl` (900px)

### Example Component

```jsx
<div className="article-card">
  <div className="flex gap-2 mb-3">
    <span className="meta-tag">Topic</span>
    <span className="meta-tag">Author Name</span>
  </div>
  <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-2">
    Article Title Here
  </h3>
  <p className="text-atlantic-slate">
    Article excerpt or description text goes here...
  </p>
</div>
```

## Data Sources

### Primary: Infactory API
- **Base URL:** `https://atlantichack-api.infactory.ai/v1/`
- **Auth:** `X-API-Key` header with API key
- **Endpoints:**
  - `GET /topics` - List all available topics
  - `POST /search` - Search articles (query, top_k, mode, filters)
  - `GET /authors` - List authors
  - `GET /articles/{id}/content` - Get full article content

### Backup: Local Data Dump
- **File:** `data/atlantic_hackathon_articles.json`
- **Content:** Full article dataset with article_id, title, date_published, byline, site_section, topic_name, content
- **Use when:** API is unreliable or for offline development

### Demo Topic: Climate Change
The primary demo uses the **Climate Change** topic cluster:
- 10+ articles spanning 2022-2025
- Topics include: IPCC reports, policy debates, environmental solutions, COP30
- Sample headlines: "A Sicker, Poorer, and Less Abundant World", "Scientists Are Moving Forests North"

The Atlantic archive via Infactory is more modern-focused. Good demo topics should be:
- Educationally relevant
- Historically significant
- Have enough sources for meaningful research
- Not overly politically charged

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server
bun run build        # Production build
bun run preview      # Preview production build
bun run lint         # Run ESLint
bun run typecheck    # Run TypeScript checks
```

## Project Context & Reference Files

**READ THESE FILES** to understand the project vision and context.

### Planning Documents (`.claude/plans/`)

#### `idea.md` - THE CORE CONCEPT
The full product specification. Key points:
- **Problem**: In 2026, AI makes it easy for students to shortcut learning. Teachers need tools to create environments where students must actually think.
- **Solution**: Three-layer system (Atlantic Editorial → Teacher → Student) where teachers curate bounded research environments from The Atlantic's archive
- **Key insight**: "AI should help teachers CREATE the conditions for learning, not give students answers"
- **Demo success criteria**: Teacher login → topic selection → classroom config → student research → writing station with Socratic AI

#### `conversation-log.md` - BRAINSTORMING CONTEXT
Full brainstorming session capturing:
- Andrew's background (podcast host, former teacher, engineer)
- The emotional arcs for teachers, excelling students, and struggling students
- Why this approach differs from competitors (empowerment over replacement)
- Key quotes and design philosophy

#### `api-info.md` - API DETAILS
- Base URL: `https://atlantichack-api.infactory.ai/demo/`
- Auth via `INFACTORY_API_KEY` in `.env.local`
- Archive is more modern-focused, so target recent/current events
- Need to explore endpoints to find good topic clusters

### Reference Materials (`.claude/ref/`)

#### `event-description.md` - HACKATHON INFO
- Hacks/Hackers + The Atlantic + Infactory hackathon
- $5,000 prize for top project
- Goal: "build experiences that embody trusted news-experiences of tomorrow"

#### `competitor-ideas.md` - OTHER TEAMS' PITCHES
What others are building (to differentiate from):
- Infinite canvas article graphs
- SAT/GRE reading comprehension
- Timeline generators
- Personalization/recommendation engines
- Reader participation systems

**Our differentiator**: We focus on **teacher empowerment** and **bounded learning environments**, not consumption optimization or personalization.

#### `verge-interview-with-the-atlantic-ceo.md` - ATLANTIC CONTEXT
Interview with CEO Nick Thompson covering:
- The Atlantic's OpenAI deal and AI strategy
- Concerns about web "enshittification"
- Focus on subscription business and brand value
- Product team prompts (including "How might we make The Atlantic accessible to high school/college students and teachers?")

### Key Differentiators (memorize these)

1. **Teacher empowerment, not replacement** - AI helps teachers curate; students still do the thinking
2. **Bounded worlds** - Students can't shortcut to the whole internet; they work within curated sources
3. **Socratic AI** - The tutor asks questions only, never gives answers, nothing copy-pasteable
4. **Process visibility** - Teachers see the journey, not just the destination
5. **Atlantic partnership** - Creates sustainable model connecting journalism to education

<!-- br-agent-instructions-v1 -->

---

## Beads Workflow Integration

This project uses [beads_rust](https://github.com/Dicklesworthstone/beads_rust) (`br`/`bd`) for issue tracking. Issues are stored in `.beads/` and tracked in git.

### Essential Commands

```bash
# View ready issues (unblocked, not deferred)
br ready              # or: bd ready

# List and search
br list --status=open # All open issues
br show <id>          # Full issue details with dependencies
br search "keyword"   # Full-text search

# Create and update
br create --title="..." --type=task --priority=2
br update <id> --status=in_progress
br close <id> --reason="Completed"
br close <id1> <id2>  # Close multiple issues at once

# Sync with git
br sync --flush-only  # Export DB to JSONL
br sync --status      # Check sync status
```

### Workflow Pattern

1. **Start**: Run `br ready` to find actionable work
2. **Claim**: Use `br update <id> --status=in_progress`
3. **Work**: Implement the task
4. **Complete**: Use `br close <id>`
5. **Sync**: Always run `br sync --flush-only` at session end

### Key Concepts

- **Dependencies**: Issues can block other issues. `br ready` shows only unblocked work.
- **Priority**: P0=critical, P1=high, P2=medium, P3=low, P4=backlog (use numbers 0-4, not words)
- **Types**: task, bug, feature, epic, question, docs
- **Blocking**: `br dep add <issue> <depends-on>` to add dependencies

### Session Protocol

**Before ending any session, run this checklist:**

```bash
git status              # Check what changed
git add <files>         # Stage code changes
br sync --flush-only    # Export beads changes to JSONL
git commit -m "..."     # Commit everything
git push                # Push to remote
```

### Best Practices

- Check `br ready` at session start to find available work
- Update status as you work (in_progress → closed)
- Create new issues with `br create` when you discover tasks
- Use descriptive titles and set appropriate priority/type
- Always sync before ending session

<!-- end-br-agent-instructions -->

<!-- bv-agent-instructions-v1 -->
### Using bv as an AI sidecar

bv is a graph-aware triage engine for Beads projects (.beads/beads.jsonl). Instead of parsing JSONL or hallucinating graph traversal, use robot flags for deterministic, dependency-aware outputs with precomputed metrics (PageRank, betweenness, critical path, cycles, HITS, eigenvector, k-core).

**Scope boundary:** bv handles *what to work on* (triage, priority, planning). For agent-to-agent coordination (messaging, work claiming, file reservations), use [MCP Agent Mail](https://github.com/Dicklesworthstone/mcp_agent_mail).

**⚠️ CRITICAL: Use ONLY `--robot-*` flags. Bare `bv` launches an interactive TUI that blocks your session.**

#### The Workflow: Start With Triage

**`bv --robot-triage` is your single entry point.** It returns everything you need in one call:

- `quick_ref`: at-a-glance counts + top 3 picks
- `recommendations`: ranked actionable items with scores, reasons, unblock info
- `quick_wins`: low-effort high-impact items
- `blockers_to_clear`: items that unblock the most downstream work
- `project_health`: status/type/priority distributions, graph metrics
- `commands`: copy-paste shell commands for next steps

bv --robot-triage        # THE MEGA-COMMAND: start here
bv --robot-next          # Minimal: just the single top pick + claim command

#### Other Commands

**Planning:**

| Command | Returns |
|---------|---------|
| `--robot-plan` | Parallel execution tracks with `unblocks` lists |
| `--robot-priority` | Priority misalignment detection with confidence |

**Graph Analysis:**

| Command | Returns |
|---------|---------|
| `--robot-insights` | Full metrics: PageRank, betweenness, HITS (hubs/authorities), eigenvector, critical path, cycles, k-core, articulation points, slack |
| `--robot-label-health` | Per-label health: `health_level` (healthy\|warning\|critical), `velocity_score`, `staleness`, `blocked_count` |
| `--robot-label-flow` | Cross-label dependency: `flow_matrix`, `dependencies`, `bottleneck_labels` |
| `--robot-label-attention [--attention-limit=N]` | Attention-ranked labels by: (pagerank × staleness × block_impact) / velocity |

**History & Change Tracking:**

| Command | Returns |
|---------|---------|
| `--robot-history` | Bead-to-commit correlations: `stats`, `histories` (per-bead events/commits/milestones), `commit_index` |
| `--robot-diff --diff-since <ref>` | Changes since ref: new/closed/modified issues, cycles introduced/resolved |

**Other Commands:**

| Command | Returns |
|---------|---------|
| `--robot-burndown <sprint>` | Sprint burndown, scope changes, at-risk items |
| `--robot-forecast <id\|all>` | ETA predictions with dependency-aware scheduling |
| `--robot-alerts` | Stale issues, blocking cascades, priority mismatches |
| `--robot-suggest` | Hygiene: duplicates, missing deps, label suggestions, cycle breaks |
| `--robot-graph [--graph-format=json\|dot\|mermaid]` | Dependency graph export |
| `--export-graph <file.html>` | Self-contained interactive HTML visualization |

#### Scoping & Filtering

bv --robot-plan --label backend              # Scope to label's subgraph
bv --robot-insights --as-of HEAD~30          # Historical point-in-time
bv --recipe actionable --robot-plan          # Pre-filter: ready to work (no blockers)
bv --recipe high-impact --robot-triage       # Pre-filter: top PageRank scores
bv --robot-triage --robot-triage-by-track    # Group by parallel work streams
bv --robot-triage --robot-triage-by-label    # Group by domain

#### Understanding Robot Output

**All robot JSON includes:**

- `data_hash` — Fingerprint of source beads.jsonl (verify consistency across calls)
- `status` — Per-metric state: `computed|approx|timeout|skipped` + elapsed ms
- `as_of` / `as_of_commit` — Present when using `--as-of`; contains ref and resolved SHA

**Two-phase analysis:**

- **Phase 1 (instant):** degree, topo sort, density — always available immediately
- **Phase 2 (async, 500ms timeout):** PageRank, betweenness, HITS, eigenvector, cycles — check `status` flags

**For large graphs (>500 nodes):** Some metrics may be approximated or skipped. Always check `status`.

#### jq Quick Reference

bv --robot-triage | jq '.quick_ref'                        # At-a-glance summary
bv --robot-triage | jq '.recommendations[0]'               # Top recommendation
bv --robot-plan | jq '.plan.summary.highest_impact'        # Best unblock target
bv --robot-insights | jq '.status'                         # Check metric readiness
bv --robot-insights | jq '.Cycles'                         # Circular deps (must fix!)
bv --robot-label-health | jq '.results.labels[] | select(.health_level == "critical")'

**Performance:** Phase 1 instant, Phase 2 async (500ms timeout). Prefer `--robot-plan` over `--robot-insights` when speed matters. Results cached by data hash.

Use bv instead of parsing beads.jsonl—it computes PageRank, critical paths, cycles, and parallel tracks deterministically.
<!-- end-bv-agent-instructions -->
