#!/usr/bin/env tsx
/**
 * Create Test User Script for Gatherly
 * Creates a test user with organization and events via Better Auth API
 * 
 * Prerequisites: 
 * - Database must be seeded (npm run seed)
 * - Development server must be running (npm run dev)
 * 
 * Usage: npm run seed:user
 */

import { db } from '../src/lib/db/index'
import { eq } from 'drizzle-orm'
import * as schema from '../src/lib/db/schema'
import { generateSlug } from '../src/lib/utils/slug'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Ensure environment variables are loaded
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set')
  console.log('💡 Make sure you have .env.local file with proper DATABASE_URL')
  process.exit(1)
}

const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || 'http://localhost:3000'

async function createTestUser() {
  console.log('👤 Creating test user via Better Auth API...')

  try {
    // Check if user already exists
    const existingUser = await db.select()
      .from(schema.userTable)
      .where(eq(schema.userTable.email, 'dwihp.165@gmail.com'))
      .limit(1)

    if (existingUser.length > 0) {
      console.log('⚠️  Test user already exists')
      console.log(`   📧 Email: ${existingUser[0].email}`)
      console.log(`   👤 Name: ${existingUser[0].name}`)
      console.log('   🔑 Password: Test@123456')
      console.log('   ✅ You can sign in at http://localhost:3000/sign-in')
      return
    }

    // Create user via Better Auth signup API
    console.log('📡 Calling Better Auth signup API...')
    const response = await fetch(`${BETTER_AUTH_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User (Dwi)',
        email: 'dwihp.165@gmail.com',
        password: 'Test@123456',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Failed to create user via Better Auth API:')
      console.error('   Status:', response.status, response.statusText)
      console.error('   Error:', errorText)
      console.log('\n💡 Make sure the development server is running:')
      console.log('   npm run dev')
      return
    }

    await response.json() // Consume the response
    console.log('✅ Test user created via Better Auth API')

    // Get the created user from database
    const [testUser] = await db.select()
      .from(schema.userTable)
      .where(eq(schema.userTable.email, 'dwihp.165@gmail.com'))
      .limit(1)

    if (!testUser) {
      console.error('❌ Failed to find created test user in database')
      return
    }

    console.log('🏢 Creating test organization...')

    // Create a test organization for the user
    const [testOrg] = await db.insert(schema.organizationTable).values({
      name: 'Dwi Test Organization',
      slug: 'dwi-test-org',
      logo: 'https://via.placeholder.com/150x150',
      metadata: JSON.stringify({
        description: 'Test organization for Dwi user',
        website: 'https://test.gatherly.id',
        industry: 'Technology'
      }),
      createdAt: new Date()
    }).returning()

    // Make the user an admin member of the organization
    await db.insert(schema.memberTable).values({
      userId: testUser.id,
      organizationId: testOrg.id,
      role: 'admin', // Give admin privileges
      createdAt: new Date()
    })

    console.log('🎪 Creating test events...')

    // Create some test events for this organization
    const testEvents = [
      {
        organizationId: testOrg.id,
        name: 'Dwi\'s Tech Meetup Jakarta 2025',
        slug: generateSlug('Dwi\'s Tech Meetup Jakarta 2025'),
        description: 'A test event for demonstrating Gatherly platform capabilities. Join us for networking and tech discussions.',
        dateTime: new Date('2025-03-15T19:00:00Z'),
        location: 'Jakarta Convention Center',
        posterUrl: 'https://via.placeholder.com/400x600',
        status: 'published' as const,
        totalTickets: 100,
        ticketsSold: 25,
        totalRevenue: '12500000', // 12.5M IDR
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizationId: testOrg.id,
        name: 'Dwi\'s Startup Pitch Night',
        slug: generateSlug('Dwi\'s Startup Pitch Night'),
        description: 'Monthly startup pitch event. Present your ideas and get feedback from investors.',
        dateTime: new Date('2025-04-20T18:00:00Z'),
        location: 'SCBD Suites',
        posterUrl: 'https://via.placeholder.com/400x600',
        status: 'draft' as const,
        totalTickets: 50,
        ticketsSold: 0,
        totalRevenue: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await db.insert(schema.eventsTable).values(testEvents)

    console.log('\n✅ Test user setup completed successfully!')
    console.log('')
    console.log('👤 USER DETAILS:')
    console.log(`   📧 Email: ${testUser.email}`)
    console.log(`   🔑 Password: Test@123456`)
    console.log(`   👤 Name: ${testUser.name}`)
    console.log(`   🆔 User ID: ${testUser.id}`)
    console.log('')
    console.log('🏢 ORGANIZATION DETAILS:')
    console.log(`   🏢 Organization: ${testOrg.name}`)
    console.log(`   🔗 Slug: ${testOrg.slug}`)
    console.log(`   👑 Role: Admin`)
    console.log(`   🆔 Org ID: ${testOrg.id}`)
    console.log('')
    console.log('🎪 CREATED EVENTS:')
    console.log(`   📅 Event 1: ${testEvents[0].name}`)
    console.log(`   📅 Event 2: ${testEvents[1].name}`)
    console.log('')
    console.log('🔐 READY TO TEST:')
    console.log('   1. Go to http://localhost:3000/sign-in')
    console.log('   2. Use email: dwihp.165@gmail.com')
    console.log('   3. Use password: Test@123456')
    console.log('   4. Access dashboard at http://localhost:3000/dashboard')
    console.log('   5. Manage events and organization settings')

  } catch (error) {
    console.error('❌ Failed to create test user:', error)
    console.log('\n💡 Troubleshooting:')
    console.log('   1. Make sure the development server is running: npm run dev')
    console.log('   2. Make sure the database is seeded: npm run seed')
    console.log('   3. Check that Better Auth is configured correctly')
  }
}

async function main() {
  console.log('🔧 GATHERLY TEST USER CREATOR')
  console.log('='.repeat(50))

  await createTestUser()
}

main()
