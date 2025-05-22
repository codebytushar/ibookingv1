// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Type definitions
type UserRole = 'guest' | 'satsangi' | 'admin' | 'volunteer'
type ProtectedRouteConfig = {
  path: string
  roles: UserRole[]
  redirectPath?: string
}

// Configuration
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true'
const PROTECTED_ROUTES: ProtectedRouteConfig[] = [
  { path: '/dashboard', roles: ['satsangi', 'admin', 'volunteer'], redirectPath: '/login' },
  { path: '/allocations', roles: ['volunteer', 'admin'], redirectPath: '/dashboard' },
  { path: '/admin', roles: ['admin'], redirectPath: '/unauthorized' },
  { path: '/check-in', roles: ['volunteer', 'admin'], redirectPath: '/dashboard' },
  { path: '/room-management', roles: ['volunteer', 'admin'], redirectPath: '/dashboard' }
]

const PUBLIC_ROUTES = ['/', '/login', '/register', '/maintenance', '/unauthorized']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('authToken')?.value
  const response = NextResponse.next()

  // 1. Maintenance Mode Check
  if (MAINTENANCE_MODE && !pathname.startsWith('/maintenance')) {
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }

  // 2. Skip middleware for public routes and static files
  if (
    PUBLIC_ROUTES.some(route => pathname.startsWith(route)) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return response
  }

  // 3. Authentication and Authorization Check
  for (const route of PROTECTED_ROUTES) {
    if (pathname.startsWith(route.path)) {
      if (!authToken) {
        return NextResponse.redirect(new URL(route.redirectPath || '/login', request.url))
      }

      try {
        const userRole = await getUserRole(authToken)
        
        if (!route.roles.includes(userRole)) {
          return NextResponse.redirect(new URL(route.redirectPath || '/unauthorized', request.url))
        }

        // Add user role to request headers for backend APIs
        request.headers.set('x-user-role', userRole)
      } catch (error) {
        console.error('Role verification failed:', error)
        return NextResponse.redirect(new URL('/login', request.url))
      }
      break
    }
  }

  // 4. Security Headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  )

  // 5. Logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Middleware] ${request.method} ${pathname}`)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public routes (defined above)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

// Mock function - replace with actual implementation
async function getUserRole(token: string): Promise<UserRole> {
  // In a real app, you would:
  // 1. Verify the JWT
  // 2. Extract the role from the token payload
  // 3. Return the role
  
  // For demo purposes, we'll return a mock role
  return 'admin' // Replace with actual implementation
}