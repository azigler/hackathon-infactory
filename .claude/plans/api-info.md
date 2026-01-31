# Infactory API Information

## Base URL
https://atlantichack-api.infactory.ai/v1/

## Authentication
Header: `X-API-Key: <key>`
API Key stored in `.env.local`: `INFACTORY_API_KEY`

## Example Search Query
```bash
curl -X POST 'https://atlantichack-api.infactory.ai/v1/search' \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: ak_Buz-g6-du8QEF92s31wQuCvpPY1LvXc68YEEvFqGsRM' \
  -d '{
  "query": "world war 2",
  "top_k": 20,
  "mode": "hybrid",
  "rerank": false,
  "filters": {
    "topics": [],
    "authors": [],
    "sections": [],
    "date_from": null,
    "date_to": null
  },
  "group_by": "year",
  "include": {
    "chunk_excerpt": true,
    "embedding": false
  }
}'
```

## Search Parameters
- `query`: Search string (required)
- `top_k`: Number of results (1-20)
- `mode`: "semantic", "keyword", or "hybrid"
- `rerank`: Boolean for cross-encoder reranking
- `filters`: Object with topics, authors, sections, date_from, date_to
- `group_by`: "topic", "author", "year", or "section"
- `include`: chunk_excerpt (boolean), embedding (boolean)

## Known Endpoints (from OpenAPI)
- POST /v1/search - Search articles
- POST /v1/summarize - Summarize content
- POST /v1/answer - Q&A endpoint
- GET /v1/topics - List topics
- GET /v1/authors - List authors
- GET /v1/articles/{id}/content - Get article content

## Notes
- The archive is more modern in focus
- We need to find topical clusters that work well as virtual classroom "newsrooms"
