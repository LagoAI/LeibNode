import { NextApiRequest, NextApiResponse } from 'next'
import rateLimit from 'express-rate-limit'
import { getToken } from 'next-auth/jwt'

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

// Type for API handlers
type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void

// Middleware wrapper
export function withApiMiddleware(handler: ApiHandler): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Apply rate limiting
      await new Promise((resolve) => limiter(req, res, resolve))

      // Verify authentication
      const token = await getToken({ req })
      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized'
        })
      }

      // Add user info to request
      ;(req as any).user = token

      // Call the actual handler
      await handler(req, res)
    } catch (error) {
      console.error('API Error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      })
    }
  }
} 