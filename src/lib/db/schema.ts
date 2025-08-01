import { pgTable, text, timestamp, boolean, integer, uuid, varchar, decimal, pgEnum } from 'drizzle-orm/pg-core'

// Better Auth Core Tables
export const userTable = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const sessionTable = pgTable('session', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  // Organization plugin fields
  activeOrganizationId: uuid('active_organization_id'),
  activeTeamId: uuid('active_team_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const accountTable = pgTable('account', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const verificationTable = pgTable('verification', {
  id: uuid('id').defaultRandom().primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Organization Plugin Tables
export const organizationTable = pgTable('organization', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  logo: text('logo'),
  metadata: text('metadata'), // JSON string
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const memberTable = pgTable('member', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id').notNull().references(() => organizationTable.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 100 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const invitationTable = pgTable('invitation', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  inviterId: uuid('inviter_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id').notNull().references(() => organizationTable.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 100 }).notNull().default('member'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  expiresAt: timestamp('expires_at').notNull(),
  teamId: uuid('team_id'), // Optional team assignment
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Teams (optional - enabled via organization plugin config)
export const teamTable = pgTable('team', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  organizationId: uuid('organization_id').notNull().references(() => organizationTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const teamMemberTable = pgTable('team_member', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamId: uuid('team_id').notNull().references(() => teamTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Gatherly Business Tables
export const eventStatusEnum = pgEnum('event_status', ['draft', 'published', 'cancelled'])

export const eventsTable = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  // Multi-tenancy: Every event belongs to an organization
  organizationId: uuid('organization_id').notNull().references(() => organizationTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  dateTime: timestamp('date_time').notNull(),
  location: varchar('location', { length: 500 }).notNull(),
  posterUrl: text('poster_url'),
  status: eventStatusEnum('status').default('draft'),
  totalTickets: integer('total_tickets').default(0),
  ticketsSold: integer('tickets_sold').default(0),
  totalRevenue: decimal('total_revenue', { precision: 15, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const ticketsTable = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').references(() => eventsTable.id).notNull(),
  // Multi-tenancy: Every ticket belongs to an organization (for easy filtering)
  organizationId: uuid('organization_id').notNull().references(() => organizationTable.id, { onDelete: 'cascade' }),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerWhatsapp: varchar('customer_whatsapp', { length: 20 }),
  ticketType: varchar('ticket_type', { length: 100 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  qrCode: text('qr_code').notNull(),
  isCheckedIn: boolean('is_checked_in').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})
