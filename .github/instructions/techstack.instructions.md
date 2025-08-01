---
applyTo: '**'
---
# Gatherly Techstack Reference

This document provides a comprehensive overview of the technology stack used in the Gatherly ticketing SaaS platform.

## Core Framework & Language

### Next.js 15
- **Purpose**: Full-stack React framework with built-in API routes
- **Configuration**: App Router with Server and Client Components
- **MVP Strategy**: Built-in Node.js backend for rapid development
- **Future**: Will migrate to dedicated backend service post-MVP
- **Key Features**:
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes for backend functionality
  - Built-in optimization for performance

### TypeScript
- **Configuration**: Strict mode enabled
- **Rules**: 
  - NEVER use `any` type
  - Always use proper type definitions
  - Leverage type inference where appropriate
- **Benefits**: Enhanced developer experience, compile-time error checking

## Database & ORM

### PostgreSQL
- **Purpose**: Primary relational database
- **Features**: ACID compliance, complex queries, JSON support
- **Deployment**: VPS for production, local for development

### Drizzle ORM
- **Purpose**: Type-safe database queries and schema management
- **Benefits**:
  - Full TypeScript integration
  - Migration system
  - Performance optimizations
  - SQL-like query builder
- **Usage**: Schema definitions, queries, migrations

## State Management & Data Fetching

### TanStack Query (React Query)
- **Purpose**: Server state management and caching
- **Features**:
  - Automatic background updates
  - Optimistic updates
  - Error handling
  - Request deduplication
- **Usage**: API calls, server state synchronization

### Zustand
- **Purpose**: Global client state management
- **Usage**: 
  - Cross-feature application state
  - User preferences
  - UI state that needs to persist across routes
- **Benefits**: Lightweight, simple API, TypeScript support

## Authentication & Authorization

### Better-auth
- **Purpose**: Authentication and session management
- **Features**:
  - Multiple auth providers
  - Session management
  - Role-based access control
- **Plugins**:
  - **Admin Plugin**: For platform administration
  - **Organization Plugin**: For multi-tenant SaaS functionality
- **Benefits**: Built for modern web apps, TypeScript-first

## UI & Styling

### Shadcn/UI
- **Purpose**: Primary UI component library
- **Benefits**:
  - Accessible by default
  - Customizable components
  - Built on Radix UI primitives
  - Copy-paste components (not npm dependency)
- **Installation**: `npx shadcn@latest add [component-name]`

### Tailwind CSS
- **Purpose**: Utility-first CSS framework
- **Configuration**: Mobile-first responsive design approach
- **Benefits**:
  - Rapid prototyping
  - Consistent design system
  - Small bundle size
  - Dark mode support

## Form Handling & Validation

### React Hook Form
- **Purpose**: Performant form library
- **Features**:
  - Minimal re-renders
  - Built-in validation
  - Easy integration with UI libraries
- **Integration**: Works seamlessly with Shadcn/UI form components

### Zod
- **Purpose**: Schema validation and runtime type checking
- **Usage**:
  - API request/response validation
  - Form validation schemas
  - Database schema validation
  - Type inference from schemas
- **Benefits**: TypeScript-first, composable schemas

## Payment Processing

### Payment Gateway Abstraction
- **Strategy**: Wrapper interface for multiple payment providers
- **Initial**: Dummy implementation for development
- **Production Options**:
  - **Midtrans**: Popular Indonesian payment gateway
  - **Xendit**: Modern payment infrastructure for SEA
- **Supported Methods**: QRIS, GoPay, OVO, DANA, Bank Transfer

```typescript
// Payment abstraction interface
export interface PaymentGateway {
  createCharge(params: CreateChargeParams): Promise<CreateChargeResult>;
  handleWebhook(payload: unknown): Promise<WebhookResult>;
}
```

## Deployment & Infrastructure

### Docker
- **Purpose**: Containerization for consistent deployments
- **Setup**: Separate containers for frontend and backend
- **Development**: Docker Compose for local environment
- **Production**: Kubernetes or Docker Swarm orchestration

### Deployment Strategy
- **MVP Frontend**: Vercel (free domain and hosting)
- **MVP Database**: VPS (Virtual Private Server)
- **Future Frontend**: Docker containers on VPS/cloud
- **Future Backend**: Dedicated service with Docker

### Environment Configuration
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Architecture Principles

### Server-First Approach
- **Principle**: Always consider server-side solutions first
- **Benefits**:
  - Better SEO
  - Faster initial page loads
  - Reduced client-side JavaScript
  - Better security for sensitive operations

### Clean Architecture Layers
- **View Layer**: UI components (Container + Presentation)
- **Use Cases Layer**: Business logic hooks
- **Repository Layer**: Data access and API communication
- **Models Layer**: Types, interfaces, and schemas

```
src/[feature]/
├── view/
│   ├── container/     # Orchestration components
│   └── presentation/  # Pure UI components
├── usecases/          # Business logic hooks
├── repositories/      # Data access layer
└── models/            # Types and schemas
    ├── interfaces/
    ├── types/
    └── dummy/
```

## Development Workflow

### Package Management
```bash
# Install dependencies
npm install

# Add Shadcn components
npx shadcn@latest add button card input

# Database operations
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
```

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (integrated with ESLint)
- **TypeScript**: Compile-time type checking
- **Husky**: Git hooks for pre-commit checks

### Testing Strategy (Future)
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Playwright for E2E
- **API Tests**: Supertest for API endpoints

## Indonesian Market Specific

### Localization
- **Currency**: IDR (Indonesian Rupiah) formatting
- **Language**: Bahasa Indonesia support
- **Date/Time**: Indonesian locale formatting
- **Mobile-First**: Optimized for mobile users

### Payment Methods Priority
1. **QRIS**: Universal QR payment standard
2. **E-wallets**: GoPay, OVO, DANA
3. **Bank Transfer**: Virtual accounts
4. **Credit/Debit Cards**: Secondary option

### Multi-tenancy (SaaS)
- **Schema**: Tenant isolation at database level
- **Authentication**: Organization-based access control
- **Billing**: Per-tenant usage tracking
- **Customization**: Tenant-specific branding

## Performance Considerations

### Optimization Strategies
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Dynamic imports for large components
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: TanStack Query for server state caching
- **CDN**: Static assets delivery optimization

### Monitoring (Future)
- **Error Tracking**: Sentry integration
- **Performance**: Web Vitals monitoring
- **Analytics**: User behavior tracking
- **Uptime**: Service availability monitoring

## Security Measures

### Authentication Security
- **Session Management**: Secure HTTP-only cookies
- **CSRF Protection**: Built-in Next.js protection
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Zod schema validation

### Data Protection
- **Tenant Isolation**: Row-level security
- **SQL Injection**: Parameterized queries via Drizzle
- **XSS Protection**: React's built-in sanitization
- **HTTPS**: TLS encryption for all communications

## Development Guidelines

### Code Organization
- **Feature-based**: Organize by business features
- **Layer Separation**: Strict architectural boundaries
- **Type Safety**: Comprehensive TypeScript coverage
- **Reusability**: Shared utilities and components

### Best Practices
- **Server Components**: Default choice for data fetching
- **Client Components**: Only when interactivity is needed
- **Error Boundaries**: Comprehensive error handling
- **Loading States**: Skeleton components for better UX
- **Accessibility**: WCAG 2.1 AA compliance

This techstack is designed to scale from MVP to enterprise-level SaaS platform while maintaining developer productivity and code quality.