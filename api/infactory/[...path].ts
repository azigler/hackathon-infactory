import type { VercelRequest, VercelResponse } from '@vercel/node'

const INFACTORY_API_BASE = 'https://atlantichack-api.infactory.ai/v1'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    // Get the API key from environment variable
    const apiKey = process.env.INFACTORY_API_KEY
    if (!apiKey) {
      res.status(500).json({ error: 'INFACTORY_API_KEY environment variable is not set' })
      return
    }

    // Get the path segments from the catch-all route
    const { path } = req.query
    const pathSegments = Array.isArray(path) ? path : path ? [path] : []
    const targetPath = pathSegments.join('/')

    // Build the target URL
    const targetUrl = `${INFACTORY_API_BASE}/${targetPath}`

    // Prepare headers for the upstream request
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    }

    // Forward the request to the Infactory API
    const fetchOptions: {
      method: string
      headers: Record<string, string>
      body?: string
    } = {
      method: req.method || 'GET',
      headers,
    }

    // Include body for methods that support it
    if (req.method && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
      fetchOptions.body = JSON.stringify(req.body)
    }

    const response = await fetch(targetUrl, fetchOptions)

    // Get the response data
    const contentType = response.headers.get('content-type')
    let data: unknown

    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    // Set CORS headers to allow requests from the frontend
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key')

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    // Return the response with the same status code
    res.status(response.status)

    if (typeof data === 'string') {
      res.send(data)
    } else {
      res.json(data)
    }
  } catch (error) {
    console.error('Proxy error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    res.status(500).json({ error: 'Proxy request failed', message })
  }
}
