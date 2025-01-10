import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/dashboard/*',
  '/api/node/deploy'
]

// Add paths that are always public
const publicPaths = ['/', '/login', '/user/login']

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  // Check if the path is public
  if (publicPaths.includes(currentPath)) {
    return NextResponse.next()
  }

  // Check if the path needs protection
  const isProtectedPath = protectedPaths.some(path => {
    if (path.endsWith('*')) {
      return currentPath.startsWith(path.slice(0, -1))
    }
    return currentPath === path
  })

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // Get the auth token from the cookies
  const authToken = request.cookies.get('auth-storage')
  let isAuthenticated = false

  if (authToken) {
    try {
      const authData = JSON.parse(authToken.value)
      isAuthenticated = authData.state && authData.state.isAuthenticated && authData.state.apiKey
      console.log('Auth check:', { isAuthenticated, state: authData.state })
    } catch (e) {
      console.error('Auth parse error:', e)
      isAuthenticated = false
    }
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', currentPath)
    return NextResponse.redirect(loginUrl)
  }

  // Add Authorization header to API requests
  if (currentPath.startsWith('/api/')) {
    try {
      const authData = JSON.parse(authToken!.value)
      const apiKey = authData.state.apiKey
      
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('Authorization', apiKey)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (e) {
      console.error('API auth error:', e)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|favicon.ico|images|fonts).*)',
  ],
} 