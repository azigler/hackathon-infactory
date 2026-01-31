// Infactory API client for The Atlantic archive

// Use proxy in development to avoid CORS issues
const API_BASE = '/api/infactory/'
const API_KEY = 'ak_Buz-g6-du8QEF92s31wQuCvpPY1LvXc68YEEvFqGsRM'

// Types for API responses
export interface ArticleChunk {
  chunk_id: string
  article_id: number
  title: string
  published_at: string
  author: string
  section: string
  topic: string
  excerpt: string
}

export interface SearchResult {
  score: number
  chunk: ArticleChunk
  rrf_score: number
}

export interface SearchResponse {
  request_id: string
  data: {
    mode: string
    rerank: boolean
    dedupe: boolean
    results: SearchResult[]
    next_cursor: string | null
  }
  error: null | { message: string }
}

export interface TopicsResponse {
  request_id: string
  data: {
    topics: string[]
  }
  error: null | { message: string }
}

export interface SearchOptions {
  top_k?: number
  mode?: 'semantic' | 'keyword' | 'hybrid'
  rerank?: boolean
  filters?: {
    topics?: string[]
    authors?: string[]
    sections?: string[]
    date_from?: string | null
    date_to?: string | null
  }
  group_by?: 'topic' | 'author' | 'year' | 'section'
  include?: {
    chunk_excerpt?: boolean
    embedding?: boolean
  }
}

class InfactoryClient {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = API_BASE
    this.apiKey = API_KEY
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
      ...options.headers,
    }

    const response = await fetch(url, { ...options, headers })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get all available topics
  async getTopics(): Promise<string[]> {
    const response = await this.fetch<TopicsResponse>('topics')
    return response.data.topics
  }

  // Search articles by query
  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    const body = {
      query,
      top_k: options.top_k ?? 10,
      mode: options.mode ?? 'hybrid',
      rerank: options.rerank ?? false,
      filters: options.filters ?? {},
      include: {
        chunk_excerpt: true,
        embedding: false,
        ...options.include,
      },
    }

    const response = await this.fetch<SearchResponse>('search', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return response.data.results
  }

  // Search articles by topic filter
  async searchByTopic(topic: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    return this.search('*', {
      ...options,
      filters: {
        ...options.filters,
        topics: [topic],
      },
    })
  }

  // Get articles about AI (curated for demo)
  async getAIArticles(limit: number = 10): Promise<SearchResult[]> {
    return this.search('artificial intelligence machine learning AI', {
      top_k: limit,
      mode: 'hybrid',
    })
  }

  // Get articles about climate change (curated for demo)
  async getClimateArticles(limit: number = 10): Promise<SearchResult[]> {
    return this.search('climate change global warming environment', {
      top_k: limit,
      mode: 'hybrid',
    })
  }

  // Get articles by their chunk IDs
  // This searches for articles and filters by chunk_id since the API doesn't have a direct get-by-id endpoint
  async getArticlesByChunkIds(chunkIds: string[]): Promise<SearchResult[]> {
    if (!chunkIds || chunkIds.length === 0) {
      return []
    }

    // Since the API doesn't support fetching by ID directly,
    // we'll use a broad search and filter by chunk_id on the client side.
    // Using '*' as a wildcard search to get all articles, then filter.
    const results = await this.search('*', {
      top_k: 100, // Get a larger set to increase chance of finding our articles
      mode: 'keyword',
    })

    // Filter to only include articles that match the requested chunk IDs
    const matchedResults = results.filter((result) =>
      chunkIds.includes(result.chunk.chunk_id)
    )

    return matchedResults
  }
}

export const infactory = new InfactoryClient()
export default InfactoryClient
