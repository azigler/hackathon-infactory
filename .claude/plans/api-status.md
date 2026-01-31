# Infactory API Status Report

## Status: ONLINE

**Checked at:** 2026-01-31 (Attempt 1)

## API Details
- **Base URL:** https://atlantichack-api.infactory.ai/v1/
- **Endpoint Tested:** POST /search
- **Auth Method:** X-API-Key header

## Response Structure

The search endpoint returns a JSON object with the following structure:

```json
{
  "request_id": "req_099bf426b38640b6",
  "data": {
    "mode": "hybrid",
    "rerank": false,
    "dedupe": true,
    "results": [
      {
        "score": 0.01639344262295082,
        "chunk": {
          "chunk_id": "6799335308951909802",
          "article_id": 684632,
          "title": "What Climate Change Will Do to America by Mid Century",
          "published_at": "2025-11-10",
          "author": "Vann R. Newkirk II",
          "section": "magazine",
          "topic": "Climate & the Environment",
          "excerpt": "..."
        },
        "rrf_score": 0.01639344262295082
      }
    ],
    "next_cursor": null
  },
  "error": null
}
```

## Key Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `request_id` | string | Unique identifier for the request |
| `data.mode` | string | Search mode used (e.g., "hybrid") |
| `data.rerank` | boolean | Whether reranking was applied |
| `data.dedupe` | boolean | Whether deduplication was applied |
| `data.results` | array | Array of search result objects |
| `data.results[].score` | number | Relevance score |
| `data.results[].chunk` | object | The matched content chunk |
| `data.results[].chunk.chunk_id` | string | Unique chunk identifier |
| `data.results[].chunk.article_id` | number | Parent article ID |
| `data.results[].chunk.title` | string | Article title |
| `data.results[].chunk.published_at` | string | Publication date (YYYY-MM-DD) |
| `data.results[].chunk.author` | string | Article author |
| `data.results[].chunk.section` | string | Publication section |
| `data.results[].chunk.topic` | string | Article topic/category |
| `data.results[].chunk.excerpt` | string | Relevant text excerpt |
| `data.results[].rrf_score` | number | Reciprocal Rank Fusion score |
| `data.next_cursor` | string/null | Pagination cursor (null if no more results) |
| `error` | null/object | Error information (null on success) |

## Sample Query

```bash
curl -s -X POST "https://atlantichack-api.infactory.ai/v1/search" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: <API_KEY>" \
  -d '{"query": "test", "top_k": 1, "mode": "hybrid"}'
```

## Notes

- The API appears to index articles from The Atlantic
- Content includes climate, environment, and other topics
- Hybrid search mode combines semantic and keyword search
- RRF (Reciprocal Rank Fusion) scoring is used for result ranking
