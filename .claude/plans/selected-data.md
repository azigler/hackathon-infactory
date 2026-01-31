# Selected Data for Demo Classroom

## Demo Topic: Climate Change

The demo uses **Climate Change: Science and Society** as the primary classroom topic.

---

## Data Sources

### Primary: Infactory API (Live)
- **Endpoint:** `POST /v1/search`
- **Query:** `climate change environment global warming`
- **Articles fetched:** 10-12 per request

### Backup: Curated TypeScript Module
- **File:** `src/data/climate-change-articles.ts`
- **Articles:** 10 curated articles from The Atlantic archive
- **Use when:** API is slow or unavailable

---

## Curated Articles

| Title | Author | Date | Topic |
|-------|--------|------|-------|
| This Is the New Baseline Earth | Zoe Schlanger | 2023-11-20 | Climate & the Environment |
| A Cold Spot Near the Galápagos Is Fending Off Climate Change | Richard Kemeny | 2022-11-19 | Climate & the Environment |
| The Electricity Industry Quietly Spread Climate Denial for Years | Robinson Meyer | 2022-09-07 | Climate & the Environment |
| The 1.5 Degree Goal Is All But Dead | Robinson Meyer | 2022-04-06 | Climate & the Environment |
| The Real Stakes of the Fight Over 'Abundance' | Jonathan Chait | 2025-05-25 | Democracy & the American Idea |
| The Banality of Bad Faith Science | Benjamin Mazer | 2023-09-27 | Research & Studies |
| All the Ostriches Must Die | Daniel Engber | 2025-11-12 | Animal Kingdom & Nature |
| Dogs Are a Beach's Worst Nightmare | Ben Goldfarb | 2023-04-16 | Animal Kingdom & Nature |
| Deer Are Beta Testing a Nightmare Disease | Katherine J. Wu | 2024-02-01 | Life Sciences |
| My Mother and the Octopus | Sabrina Imbler | 2022-12-05 | Animal Kingdom & Nature |

---

## Educational Value

The curated articles cover:

1. **Climate Science**
   - Temperature baselines and COP28 negotiations
   - IPCC reports and 1.5 degree goal analysis
   - Ocean temperature refuges

2. **Climate Policy**
   - Historical climate denial by electricity industry
   - NEPA and environmental law tensions
   - Green energy infrastructure challenges

3. **Science & Society**
   - Scientific communication and peer review
   - Wildlife impacts and ecosystem changes
   - Environmental ethics

4. **Critical Perspectives**
   - "Bad faith science" in climate research
   - Industry influence on climate discourse
   - Tensions between environmental protection and climate action

---

## Demo Assignment

**Prompt for students:**
> Analyze how climate change coverage in The Atlantic has evolved. What perspectives are represented? What solutions are proposed? Use at least 3 sources from the archive to support your analysis.

---

## Technical Integration

### API Client
```typescript
import { infactory } from '@/lib/api/infactory'

// Fetch live articles
const articles = await infactory.search('climate change', { top_k: 10 })
```

### Fallback to Local Data
```typescript
import { CLIMATE_CHANGE_ARTICLES } from '@/data/climate-change-articles'

// Use curated articles when API fails
const articles = CLIMATE_CHANGE_ARTICLES
```

---

## File Locations

| Purpose | Path |
|---------|------|
| API Client | `src/lib/api/infactory.ts` |
| Curated Data | `src/data/climate-change-articles.ts` |
| Research Workspace | `src/pages/student/ResearchWorkspace.tsx` |
| Teacher Dashboard | `src/pages/teacher/TeacherDashboard.tsx` |
