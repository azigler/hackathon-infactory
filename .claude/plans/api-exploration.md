# Infactory API Documentation

**Base URL:** `https://atlantichack-api.infactory.ai/v1/`
**Authentication:** Header `X-API-Key: <your-api-key>`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Endpoints](#endpoints)
   - [GET /v1/topics](#get-v1topics)
   - [GET /v1/authors](#get-v1authors)
   - [POST /v1/search](#post-v1search)
   - [POST /v1/summarize](#post-v1summarize)
   - [POST /v1/answer](#post-v1answer)
   - [GET /v1/articles/{id}/content](#get-v1articlesidcontent)
3. [Data Structures](#data-structures)
4. [Error Handling](#error-handling)

---

## Authentication

All API requests require an API key passed in the `X-API-Key` header.

```bash
curl -H "X-API-Key: ak_Buz-g6-du8QEF92s31wQuCvpPY1LvXc68YEEvFqGsRM" \
     https://atlantichack-api.infactory.ai/v1/topics
```

---

## Endpoints

### GET /v1/topics

Returns a list of all available topic categories for filtering articles.

**Method:** `GET`
**Parameters:** None

**Response Structure:**
```json
{
  "request_id": "req_f697366003124fc2",
  "data": {
    "topics": ["string", ...]
  },
  "error": null
}
```

**Example Response (truncated):**
```json
{
  "request_id": "req_f697366003124fc2",
  "data": {
    "topics": [
      "Animal Kingdom & Nature",
      "Books, Literature, & Writing",
      "China, Trade, & Global Miscellanea",
      "Climate & the Environment",
      "Computers, Software, & Technology",
      "Congress",
      "Crime, Policing, and Prison",
      "Democracy & the American Idea",
      "Elections",
      "Food & Diet",
      "Gender & Sexuality",
      "Health, Healthcare, & Disease",
      "Immigration, Borders, & Refugees",
      "Law, Justice, & Constitution",
      "Life Sciences",
      "Life, Sex, & Relationships",
      "Media, News, & Journalism",
      "Middle East",
      "Movies & Hollywood",
      "Music",
      "Nuclear Conflict",
      "Parenting, Kids, & Generations",
      "Place (Geography, Cities, & Demography)",
      "Pregnancy & Reproductive Debate",
      "President & Presidency",
      "Race & Racism",
      "Religiosity & Theology",
      "Religious Identity & Conflict",
      "Research & Studies",
      "Russia & Eastern Europe",
      "Schools & Education",
      "Sexual Misconduct",
      "Social Media",
      "Space",
      "Sports",
      "TV & Podcasts",
      "Trends & Things",
      "Trump Scandals & Crises",
      "UK & EU",
      "Violence, Guns, & Shootings",
      "War & Military",
      "Wealth, Inequality, & Capitalism",
      "Work & Economy"
    ]
  },
  "error": null
}
```

**Total Topics:** 43 categories available

---

### GET /v1/authors

Returns a list of all authors in the article archive.

**Method:** `GET`
**Parameters:** None

**Response Structure:**
```json
{
  "request_id": "string",
  "data": {
    "authors": ["string", ...]
  },
  "error": null
}
```

**Example Response (truncated):**
```json
{
  "request_id": "req_900820c0a756467e",
  "data": {
    "authors": [
      "A. J. Jacobs",
      "A. O. Scott",
      "Adam Harris",
      "Adam Serwer",
      "Adrienne LaFrance",
      "Anne Applebaum",
      "Annie Lowrey",
      "Caitlin Flanagan",
      "Charlie Warzel",
      "David A. Graham",
      "David Brooks",
      "David Frum",
      "Derek Thompson",
      "Franklin Foer",
      "George Packer",
      "Helen Lewis",
      "James Fallows",
      "Katherine J. Wu",
      "Robinson Meyer",
      "Tom Nichols"
    ]
  },
  "error": null
}
```

**Note:** The full list contains hundreds of authors.

---

### POST /v1/search

Search for articles in the archive with various filtering options.

**Method:** `POST`
**Content-Type:** `application/json`

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `query` | string | **Yes** | - | Search query text |
| `mode` | string | No | `"hybrid"` | Search mode: `"semantic"`, `"keyword"`, or `"hybrid"` |
| `topic` | string | No | - | Filter by topic (must match exactly from /v1/topics) |
| `author` | string | No | - | Filter by author name |
| `section` | string | No | - | Filter by section (not validated - may not filter effectively) |
| `limit` | integer | No | 10 | Maximum number of results to return |
| `rerank` | boolean | No | `false` | Enable reranking for improved relevance |
| `dedupe` | boolean | No | `true` | Deduplicate results by article |

**Search Modes:**
- `"hybrid"` (default): Combines semantic and keyword search for balanced results
- `"semantic"`: Uses vector similarity for meaning-based search
- `"keyword"`: Traditional keyword/fulltext matching with BM25-style scoring

**Request Example:**
```json
{
  "query": "climate change impact",
  "mode": "hybrid",
  "topic": "Climate & the Environment",
  "limit": 5,
  "rerank": true,
  "dedupe": true
}
```

**Response Structure:**
```json
{
  "request_id": "string",
  "data": {
    "mode": "hybrid",
    "rerank": false,
    "dedupe": true,
    "results": [
      {
        "score": 0.01639344262295082,
        "chunk": {
          "chunk_id": "string",
          "article_id": 623329,
          "title": "Article Title",
          "published_at": "2022-03-01T06:00:00+00:00",
          "author": "Author Name",
          "section": "science",
          "topic": "Climate & the Environment",
          "excerpt": "Article excerpt text..."
        },
        "rrf_score": 0.01639344262295082,
        "rerank_score": 1.0,
        "original_score": 0.01639344262295082
      }
    ],
    "next_cursor": null
  },
  "error": null
}
```

**Scoring:**
- `score`: Final combined score
- `rrf_score`: Reciprocal Rank Fusion score (for hybrid mode)
- `rerank_score`: Reranking score (only present when `rerank: true`)
- `original_score`: Original search score before reranking

**Example - Basic Search:**
```bash
curl -X POST "https://atlantichack-api.infactory.ai/v1/search" \
  -H "X-API-Key: <api-key>" \
  -H "Content-Type: application/json" \
  -d '{"query": "artificial intelligence", "limit": 3}'
```

**Example - Filtered Search:**
```bash
curl -X POST "https://atlantichack-api.infactory.ai/v1/search" \
  -H "X-API-Key: <api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "artificial intelligence",
    "topic": "Computers, Software, & Technology",
    "mode": "semantic",
    "limit": 5
  }'
```

---

### POST /v1/summarize

Generate a summary based on search results for a given query.

**Method:** `POST`
**Content-Type:** `application/json`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | **Yes** | The query to summarize content for |

**Request Example:**
```json
{
  "query": "climate change impact on hurricanes"
}
```

**Response Structure:**
```json
{
  "request_id": "string",
  "data": {
    "summary": {
      "text": "Summary text with citation markers [c1], [c2]...",
      "citations": [
        {
          "citation_id": "c1",
          "chunk_id": "string",
          "article_id": 684654,
          "title": "Article Title",
          "published_at": "2025-10-27",
          "author": "Author Name",
          "excerpt": "Relevant excerpt from the article..."
        }
      ]
    },
    "retrieved": {
      "chunks": [
        {
          "chunk_id": "string",
          "score": 0.1599565
        }
      ]
    }
  },
  "error": null
}
```

**Notes:**
- The summary includes inline citation markers like `[c1]`, `[c2]` that reference the `citations` array
- The `retrieved` section shows all chunks used with their relevance scores
- Results may not always be perfectly relevant to the query

---

### POST /v1/answer

Get a direct answer to a question based on the article archive.

**Method:** `POST`
**Content-Type:** `application/json`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | **Yes** | The question to answer |

**Request Example:**
```json
{
  "query": "What did the IPCC say about global warming?"
}
```

**Response Structure:**
```json
{
  "request_id": "string",
  "data": {
    "answer": {
      "text": "Answer text with citation markers [c1], [c2]...",
      "citations": [
        {
          "citation_id": "c1",
          "chunk_id": "string",
          "article_id": 678051,
          "title": "Article Title",
          "published_at": "2024-04-15",
          "author": "Author Name",
          "excerpt": "Relevant excerpt..."
        }
      ],
      "suggested_followups": [
        "What are more recent perspectives on What?",
        "How has this topic evolved over time in the archive?"
      ]
    }
  },
  "error": null
}
```

**Notes:**
- Uses RAG (Retrieval-Augmented Generation) to answer questions
- Includes suggested follow-up questions
- Citations reference the source articles used for the answer

---

### GET /v1/articles/{id}/content

Retrieve the full content of a specific article by its ID.

**Method:** `GET`
**URL Parameter:** `id` - The article ID (integer)

**Response Structure:**
```json
{
  "request_id": "string",
  "data": {
    "article": {
      "article_id": "623329",
      "title": "A Sicker, Poorer, and Less Abundant World",
      "published_at": "2022-03-01 06:00:00+00:00",
      "author": "Robinson Meyer",
      "section": "science",
      "topic": "Climate & the Environment",
      "content": "Full article text...",
      "chunk_count": null
    }
  },
  "error": null
}
```

**Example:**
```bash
curl -X GET "https://atlantichack-api.infactory.ai/v1/articles/623329/content" \
  -H "X-API-Key: <api-key>"
```

**Error Response (Article Not Found):**
```json
{
  "detail": {
    "code": "not_found",
    "message": "Article 999999999 not found"
  }
}
```

---

## Data Structures

### Article/Chunk Object

Articles are returned as chunks (excerpts) in search results, with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `chunk_id` | string | Unique identifier for the chunk |
| `article_id` | integer | Unique identifier for the article |
| `title` | string | Article title |
| `published_at` | string | Publication date (ISO 8601 format) |
| `author` | string | Author name |
| `section` | string | Publication section (e.g., "science", "ideas", "technology") |
| `topic` | string | Topic category |
| `excerpt` | string | Text excerpt from the article chunk |

### Full Article Object (from /articles/{id}/content)

| Field | Type | Description |
|-------|------|-------------|
| `article_id` | string | Unique identifier for the article |
| `title` | string | Article title |
| `published_at` | string | Publication date with timezone |
| `author` | string | Author name |
| `section` | string | Publication section |
| `topic` | string | Topic category |
| `content` | string | Full article text |
| `chunk_count` | integer/null | Number of chunks (may be null) |

### Available Sections

Based on observed data, sections include:
- `science`
- `ideas`
- `technology`
- `magazine`
- `politics`
- `books`
- `family`
- `culture`
- `health`
- `global`
- `national-security`
- `podcasts`

---

## Error Handling

### Validation Errors

When required parameters are missing or invalid:

```json
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "query"],
      "msg": "Field required",
      "input": {}
    }
  ]
}
```

### Invalid Enum Values

When an invalid value is provided for an enum field:

```json
{
  "detail": [
    {
      "type": "literal_error",
      "loc": ["body", "mode"],
      "msg": "Input should be 'semantic', 'keyword' or 'hybrid'",
      "input": "fulltext",
      "ctx": {
        "expected": "'semantic', 'keyword' or 'hybrid'"
      }
    }
  ]
}
```

### Not Found Errors

When a resource doesn't exist:

```json
{
  "detail": {
    "code": "not_found",
    "message": "Article 999999999 not found"
  }
}
```

---

## Usage Patterns

### Finding Articles by Topic

1. First, get available topics: `GET /v1/topics`
2. Search with topic filter: `POST /v1/search` with `topic` parameter

### Getting Full Article Content

1. Search for articles: `POST /v1/search`
2. Extract `article_id` from results
3. Fetch full content: `GET /v1/articles/{article_id}/content`

### Question Answering Workflow

1. Use `POST /v1/answer` for direct Q&A with citations
2. Follow up with `POST /v1/search` for more detailed exploration
3. Use `POST /v1/summarize` for topic overviews

### Optimizing Search Results

- Use `mode: "semantic"` for conceptual/meaning-based searches
- Use `mode: "keyword"` for exact phrase matching
- Use `mode: "hybrid"` (default) for balanced results
- Enable `rerank: true` for improved relevance ordering
- Filter by `topic` or `author` to narrow results

---

## Rate Limits and Timeouts

- The `/v1/topics` endpoint may occasionally timeout (504 Gateway Timeout)
- Retry with appropriate backoff if timeouts occur
- No documented rate limits, but use reasonable request frequency

---

## Notes

- The archive appears to contain articles from The Atlantic magazine
- Article dates range from 2022 to 2025
- Some search parameters (like `section`, date ranges) may not be fully implemented
- The `next_cursor` field in search responses is present but appears to always be `null`
