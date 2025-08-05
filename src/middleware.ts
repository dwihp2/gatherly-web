import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',     // Dashboard home page
  '/events',        // Events management page (requires auth)
  '/analytics',     // Analytics pages (independent but auth-required)
  '/settings',      // Settings pages (independent but auth-required) 
  '/scanner',       // QR Scanner page (independent but auth-required)
  '/events/create', // Create event page (requires auth)
  '/events/edit',   // Edit event pages (requires auth)
]

// Define auth routes that should redirect to dashboard if already logged in
const authRoutes = [
  '/sign-in',
  '/sign-up',
]

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/pricing',
  '/contact',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get the session token from cookies
  // Better Auth uses 'better-auth.session_token' as the default cookie name
  const sessionToken = request.cookies.get('better-auth.session_token')
  const isAuthenticated = !!sessionToken?.value
  
  // Check route types
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if it's a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Special handling for public event detail routes
  const isPublicEventDetailRoute = pathname.startsWith('/events/') && 
    !pathname.startsWith('/events/create') && 
    !pathname.includes('/edit')
  
  // Check if it's a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  ) || isPublicEventDetailRoute
  
  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && isProtectedRoute && !isPublicEventDetailRoute) {
    // Store the attempted URL to redirect back after login
    const redirectUrl = new URL('/sign-in', request.url)
    redirectUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  // Allow access to public routes and auth routes
  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next()
  }
  
  // Allow the request to continue for all other routes
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes (already handled by Better Auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)',
  ],
}
