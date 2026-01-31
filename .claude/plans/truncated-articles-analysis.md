# Truncated Articles Bug Analysis

## Summary

Articles are being displayed truncated because API results that don't match curated articles only have the `excerpt` field available, not full content. The current implementation only enriches articles with full content when the `chunk_id` exactly matches a curated article.

## Data Sources

### 1. Curated Article Files

**`/src/data/climate-change-articles.ts`**
- 6 climate change articles with full content
- All have `fullContent` field with 8-15 paragraphs each
- Chunk IDs: `676065:1`, `671361:2`, `629486:1`, `672183:0`, `675464:0`, `682929:4`

**`/src/data/ai-articles.ts`**
- 11 AI/technology articles with full content
- All have `fullContent` field with substantial content
- Chunk IDs: `684063:0`, `684082:0`, `684088:0`, `683998:0`, `684064:1`, `684093:0`, `683999:0`, `684083:0`, `684040:0`, `684042:0`

### 2. Infactory API

**`/src/lib/api/infactory.ts`**
- Returns `SearchResult[]` with `ArticleChunk` containing only `excerpt` field
- No `fullContent` or `content` field in API response
- The API provides short excerpts only (a few sentences)

## Content Flow Analysis

### ResearchWorkspace.tsx (Student View)

```
1. API call: infactory.search(query, { top_k: 10 })
   - Returns ~10 articles with only 'excerpt' field

2. Content enrichment via curatedContentMap:
   - Builds map from chunk_id -> fullContent for curated articles
   - transformSearchResult() checks if curatedContentMap.get(result.chunk.chunk_id) exists
   - If found: uses curated fullContent
   - If NOT found: falls back to result.chunk.excerpt (TRUNCATED!)

3. Article display:
   - Uses selectedArticle.content which may be just the excerpt
   - Split by '\n\n' for paragraphs
```

### TeacherResearchView.tsx (Teacher Preview)

**CRITICAL BUG FOUND**: This file has a DIFFERENT, BROKEN implementation!

```javascript
// Line 175-184 - TeacherResearchView NEVER uses curated content!
transformedArticles = results.map((result: SearchResult) => ({
  id: result.chunk.chunk_id,
  title: result.chunk.title,
  author: result.chunk.author,
  year: result.chunk.published_at.split('-')[0],
  excerpt: result.chunk.excerpt.slice(0, 200) + '...',
  content: result.chunk.excerpt,  // <-- ALWAYS uses excerpt, never curated content!
  topic: result.chunk.topic,
  section: result.chunk.section,
}))
```

TeacherResearchView NEVER enriches with curated content - it always shows truncated excerpts!

## Root Causes

### Cause 1: API Results May Not Match Curated Articles

The API search returns articles based on relevance, not a fixed set. When a user searches for "climate change", the API might return:
- Some articles that ARE in our curated list (will show full content)
- Some articles that are NOT in our curated list (will show only excerpt)

**Example scenario**:
- Query: "climate change global warming environment IPCC"
- API returns 10 articles
- Only 3 match our 6 curated chunk_ids
- 7 articles show truncated content

### Cause 2: TeacherResearchView Missing Content Enrichment

The teacher preview page doesn't use the `buildCuratedContentMap()` or `transformSearchResult()` functions. It directly maps API results and always sets `content: result.chunk.excerpt`.

### Cause 3: No Full Content in API

The Infactory API only returns `excerpt` - a short summary. There is no `fullContent` or `content` field available from the API. We MUST rely on curated data for full content.

## Solution Options

### Option A: Only Show Curated Articles (Recommended)

**Strategy**: Don't use API results at all. Only display curated articles that we know have full content.

**Pros**:
- Guarantees all articles have full content
- Consistent experience
- No dependency on API returning matching articles

**Cons**:
- Limited to our 17 curated articles total
- Less dynamic content

**Implementation**:
```typescript
// For each topic, always use curated articles
const curatedArticles = topicId === 'climate-change'
  ? CLIMATE_CHANGE_ARTICLES
  : AI_ARTICLES;
setArticles(curatedArticles.map(transformCuratedArticle));
```

### Option B: Filter API Results to Only Curated

**Strategy**: Call API, but filter results to only include articles that exist in our curated list.

**Pros**:
- Uses API for relevance ranking
- Still guarantees full content

**Cons**:
- May return fewer results
- Extra API call that's partially wasted

### Option C: Hybrid with Warning

**Strategy**: Show curated articles first, then show API-only results with a "summary only" indicator.

**Pros**:
- More content available
- Transparent about limitations

**Cons**:
- Inconsistent UX
- Students may be confused

## Recommended Fix

**Use Option A** for the demo: Only display curated articles. This ensures:
1. All articles always have full content
2. Consistent, polished demo experience
3. No surprises during presentation

**Additional Fix**: Update TeacherResearchView to use the same approach as ResearchWorkspace for content enrichment (or also switch to curated-only).

## Implementation Plan

1. Modify ResearchWorkspace.tsx:
   - Remove API dependency for default articles
   - Load curated articles directly based on topicId
   - Keep API call only for custom articles (if classroom has customArticles)

2. Modify TeacherResearchView.tsx:
   - Apply same curated-only approach
   - OR add the curatedContentMap logic that ResearchWorkspace has

3. Keep fallback logic for edge cases

4. Run `bun run tsc --noEmit` to verify no type errors

## Implementation Completed

### Changes Made

**ResearchWorkspace.tsx:**
- Removed `infactory` API import (no longer needed)
- Removed `TOPIC_QUERIES` constant (no longer needed)
- Removed `buildCuratedContentMap()` function (no longer needed)
- Removed `transformSearchResult()` function (no longer needed)
- Renamed function comment to "Get curated articles for a topic (with guaranteed full content)"
- Changed `fetchArticles()` to `loadArticles()` - now loads curated articles directly
- Custom articles are still supported but loaded from curated data instead of API

**TeacherResearchView.tsx:**
- Removed `infactory` API import (no longer needed)
- Removed `TOPIC_QUERIES` constant (no longer needed)
- Renamed `getFallbackArticles()` to `getCuratedArticles()` for clarity
- Changed `fetchArticles()` to `loadArticles()` - now loads curated articles directly
- No longer uses API at all (was always showing truncated content before)

### Result

- All articles now display full content (8-15 paragraphs each)
- No API dependency for article content
- TypeScript compilation passes with `bun run tsc --noEmit`
- Both student and teacher views show consistent, complete article content
