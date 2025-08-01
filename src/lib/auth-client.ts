import { createAuthClient } from 'better-auth/client'
import { organizationClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000',
  
  plugins: [
    organizationClient({
      // Teams support
      teams: {
        enabled: true,
      },
    }),
  ],
})

// Export the auth client as default and named export
export default authClient
