import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { organization } from 'better-auth/plugins'
import { db } from './db'
import {
  userTable,
  sessionTable,
  accountTable,
  verificationTable,
  organizationTable,
  memberTable,
  invitationTable,
  teamTable,
  teamMemberTable
} from './db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
      organization: organizationTable,
      member: memberTable,
      invitation: invitationTable,
      team: teamTable,
      teamMember: teamMemberTable,
    },
  }),

  // Email/Password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // For development - enable in production
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  // Secret key for signing tokens - must be 32+ character hex string
  secret: process.env.BETTER_AUTH_SECRET!,

  // Base URL
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',

  // Organization plugin for SaaS multi-tenancy
  plugins: [
    organization({
      // Allow any user to create organizations for our SaaS
      allowUserToCreateOrganization: true,

      // Set creator as owner (default)
      creatorRole: 'owner',

      // Membership limits per organization
      membershipLimit: 100,

      // Organization limits per user
      organizationLimit: 5,

      // Invitation settings
      invitationExpiresIn: 60 * 60 * 48, // 48 hours

      // Email invitation handler (mock for now)
      async sendInvitationEmail(data) {
        // For development - just log the invitation
        console.log('📧 Invitation Email:', {
          to: data.email,
          from: data.inviter.user.email,
          organization: data.organization.name,
          invitationId: data.id,
          link: `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`,
        })

        // TODO: Implement actual email sending in production
        // await sendEmail({
        //   to: data.email,
        //   subject: `You're invited to join ${data.organization.name}`,
        //   html: `
        //     <h1>You've been invited!</h1>
        //     <p>${data.inviter.user.name} invited you to join ${data.organization.name}</p>
        //     <a href="${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}">
        //       Accept Invitation
        //     </a>
        //   `
        // })
      },

      // Organization creation hooks
      organizationCreation: {
        beforeCreate: async ({ organization, user }) => {
          // Add any custom validation or data modification
          console.log(`🏢 Creating organization: ${organization.name} for user: ${user.email}`)

          return {
            data: {
              ...organization,
              // Add any custom metadata
              metadata: JSON.stringify({
                createdBy: user.email,
                plan: 'free', // Default plan for new organizations
                features: ['basic-ticketing'],
              }),
            },
          }
        },

        afterCreate: async ({ organization }) => {
          // Set up default resources for new organization
          console.log(`✅ Organization created: ${organization.name} (${organization.id})`)

          // TODO: Create default resources like:
          // - Default event categories
          // - Welcome email to organization owner
          // - Analytics setup
          // - Stripe customer creation
        },
      },

      // Teams feature (optional)
      teams: {
        enabled: true,
        maximumTeams: 10,
        allowRemovingAllTeams: false,
      },
    }),
  ],

  // Advanced settings
  advanced: {
    // Let database handle ID generation if preferred
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
})
