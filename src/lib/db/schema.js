"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsTable = exports.eventsTable = exports.eventStatusEnum = exports.teamMemberTable = exports.teamTable = exports.invitationTable = exports.memberTable = exports.organizationTable = exports.verificationTable = exports.accountTable = exports.sessionTable = exports.userTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
// Better Auth Core Tables
exports.userTable = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    emailVerified: (0, pg_core_1.boolean)('email_verified').notNull().default(false),
    image: (0, pg_core_1.text)('image'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.sessionTable = (0, pg_core_1.pgTable)('session', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)('user_id').notNull().references(function () { return exports.userTable.id; }, { onDelete: 'cascade' }),
    token: (0, pg_core_1.text)('token').notNull(),
    expiresAt: (0, pg_core_1.timestamp)('expires_at').notNull(),
    ipAddress: (0, pg_core_1.text)('ip_address'),
    userAgent: (0, pg_core_1.text)('user_agent'),
    // Organization plugin fields
    activeOrganizationId: (0, pg_core_1.uuid)('active_organization_id'),
    activeTeamId: (0, pg_core_1.uuid)('active_team_id'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.accountTable = (0, pg_core_1.pgTable)('account', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)('user_id').notNull().references(function () { return exports.userTable.id; }, { onDelete: 'cascade' }),
    accountId: (0, pg_core_1.text)('account_id').notNull(),
    providerId: (0, pg_core_1.text)('provider_id').notNull(),
    accessToken: (0, pg_core_1.text)('access_token'),
    refreshToken: (0, pg_core_1.text)('refresh_token'),
    accessTokenExpiresAt: (0, pg_core_1.timestamp)('access_token_expires_at'),
    refreshTokenExpiresAt: (0, pg_core_1.timestamp)('refresh_token_expires_at'),
    scope: (0, pg_core_1.text)('scope'),
    idToken: (0, pg_core_1.text)('id_token'),
    password: (0, pg_core_1.text)('password'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.verificationTable = (0, pg_core_1.pgTable)('verification', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    identifier: (0, pg_core_1.text)('identifier').notNull(),
    value: (0, pg_core_1.text)('value').notNull(),
    expiresAt: (0, pg_core_1.timestamp)('expires_at').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
// Organization Plugin Tables
exports.organizationTable = (0, pg_core_1.pgTable)('organization', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    slug: (0, pg_core_1.varchar)('slug', { length: 255 }).notNull().unique(),
    logo: (0, pg_core_1.text)('logo'),
    metadata: (0, pg_core_1.text)('metadata'), // JSON string
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
exports.memberTable = (0, pg_core_1.pgTable)('member', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)('user_id').notNull().references(function () { return exports.userTable.id; }, { onDelete: 'cascade' }),
    organizationId: (0, pg_core_1.uuid)('organization_id').notNull().references(function () { return exports.organizationTable.id; }, { onDelete: 'cascade' }),
    role: (0, pg_core_1.varchar)('role', { length: 100 }).notNull().default('member'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
exports.invitationTable = (0, pg_core_1.pgTable)('invitation', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull(),
    inviterId: (0, pg_core_1.uuid)('inviter_id').notNull().references(function () { return exports.userTable.id; }, { onDelete: 'cascade' }),
    organizationId: (0, pg_core_1.uuid)('organization_id').notNull().references(function () { return exports.organizationTable.id; }, { onDelete: 'cascade' }),
    role: (0, pg_core_1.varchar)('role', { length: 100 }).notNull().default('member'),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).notNull().default('pending'),
    expiresAt: (0, pg_core_1.timestamp)('expires_at').notNull(),
    teamId: (0, pg_core_1.uuid)('team_id'), // Optional team assignment
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// Teams (optional - enabled via organization plugin config)
exports.teamTable = (0, pg_core_1.pgTable)('team', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    organizationId: (0, pg_core_1.uuid)('organization_id').notNull().references(function () { return exports.organizationTable.id; }, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.teamMemberTable = (0, pg_core_1.pgTable)('team_member', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    teamId: (0, pg_core_1.uuid)('team_id').notNull().references(function () { return exports.teamTable.id; }, { onDelete: 'cascade' }),
    userId: (0, pg_core_1.uuid)('user_id').notNull().references(function () { return exports.userTable.id; }, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
// Gatherly Business Tables
exports.eventStatusEnum = (0, pg_core_1.pgEnum)('event_status', ['draft', 'published', 'cancelled']);
exports.eventsTable = (0, pg_core_1.pgTable)('events', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    // Multi-tenancy: Every event belongs to an organization
    organizationId: (0, pg_core_1.uuid)('organization_id').notNull().references(function () { return exports.organizationTable.id; }, { onDelete: 'cascade' }),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    slug: (0, pg_core_1.varchar)('slug', { length: 100 }).notNull().unique(), // URL-friendly identifier
    description: (0, pg_core_1.text)('description'),
    dateTime: (0, pg_core_1.timestamp)('date_time').notNull(),
    location: (0, pg_core_1.varchar)('location', { length: 500 }).notNull(),
    posterUrl: (0, pg_core_1.text)('poster_url'),
    status: (0, exports.eventStatusEnum)('status').default('draft'),
    totalTickets: (0, pg_core_1.integer)('total_tickets').default(0),
    ticketsSold: (0, pg_core_1.integer)('tickets_sold').default(0),
    totalRevenue: (0, pg_core_1.decimal)('total_revenue', { precision: 15, scale: 2 }).default('0'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.ticketsTable = (0, pg_core_1.pgTable)('tickets', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    eventId: (0, pg_core_1.uuid)('event_id').references(function () { return exports.eventsTable.id; }).notNull(),
    // Multi-tenancy: Every ticket belongs to an organization (for easy filtering)
    organizationId: (0, pg_core_1.uuid)('organization_id').notNull().references(function () { return exports.organizationTable.id; }, { onDelete: 'cascade' }),
    customerName: (0, pg_core_1.varchar)('customer_name', { length: 255 }).notNull(),
    customerEmail: (0, pg_core_1.varchar)('customer_email', { length: 255 }).notNull(),
    customerWhatsapp: (0, pg_core_1.varchar)('customer_whatsapp', { length: 20 }),
    ticketType: (0, pg_core_1.varchar)('ticket_type', { length: 100 }).notNull(),
    price: (0, pg_core_1.decimal)('price', { precision: 10, scale: 2 }).notNull(),
    qrCode: (0, pg_core_1.text)('qr_code').notNull(),
    isCheckedIn: (0, pg_core_1.boolean)('is_checked_in').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
