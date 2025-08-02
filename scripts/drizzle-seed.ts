#!/usr/bin/env tsx
/**
 * Drizzle Seed Script for Gatherly
 * Uses drizzle-seed package for realistic data generation
 * Usage:
 *   npm run seed           # Populate seed data
 *   npm run seed:clean     # Clean all seed data
 *   npm run seed:reset     # Clean and repopulate
 */

import { db } from '../src/lib/db/index'
import { seed, reset } from 'drizzle-seed'
import { count, eq, sum } from 'drizzle-orm'
import * as schema from '../src/lib/db/schema'
import { auth } from '../src/lib/auth'

// Indonesian-specific values for realistic data
const indonesianVenues = [
  'Jakarta Convention Center', 'Balai Kartini', 'Hotel Mulia Senayan',
  'The Ritz-Carlton Jakarta', 'Grand Hyatt Jakarta', 'Shangri-La Hotel Jakarta',
  'Universitas Indonesia Depok', 'Institut Teknologi Bandung',
  'Universitas Gadjah Mada Yogyakarta', 'SCBD Suites', 'Plaza Indonesia',
  'Taman Ismail Marzuki', 'Gedung Kesenian Jakarta', 'Balai Sarbini',
  'JCC Plenary Hall', 'Balai Sudirman', 'Trans Studio Bandung',
  'ICE BSD City', 'Ciputra World Surabaya', 'Grand City Mall Surabaya'
]

const indonesianEventTypes = [
  'Tech Conference', 'Startup Pitch Night', 'Music Festival', 'Art Exhibition',
  'Business Summit', 'Educational Workshop', 'Cultural Festival', 'Food Festival',
  'Gaming Tournament', 'Fashion Show', 'Health & Wellness Expo', 'Book Fair',
  'Career Fair', 'Developer Meetup', 'Digital Marketing Workshop', 'Photography Workshop'
]

const indonesianCompanyNames = [
  'Teknologi Nusantara', 'Indonesia Digital Solutions', 'Nusantara Creative Hub',
  'Jakarta Innovation Lab', 'Bali Tech Community', 'Surabaya Startup Hub',
  'Bandung Creative Space', 'Indonesia Business Network', 'Archipelago Events',
  'Garuda Technology', 'Majapahit Ventures', 'Sriwijaya Digital', 'Borobudur Arts',
  'Komodo Innovations', 'Bhineka Creative', 'Indonesia Future Forum'
]

const eventNameSuffixes = [
  ' Jakarta 2025', ' Indonesia', ' Nusantara', ' Conference 2025', ' Summit',
  ' Workshop Series', ' Expo', ' Festival', ' Meetup', ' Championship'
]

async function seedDatabase() {
  console.log('🌱 Seeding database with drizzle-seed...')
  
  try {
    await seed(db, schema).refine((f) => ({
      // Create organizations (event organizers)
      organizationTable: {
        count: 20,
        columns: {
          name: f.valuesFromArray({ values: indonesianCompanyNames }),
          slug: f.string({ isUnique: true }), // Will generate unique slugs
          logo: f.default({ defaultValue: 'https://via.placeholder.com/150x150' }),
          description: f.loremIpsum({ sentencesCount: 2 })
        },
        with: {
          // Each organization gets 2-8 events
          eventsTable: [
            { weight: 0.4, count: [2, 3, 4] },
            { weight: 0.4, count: [5, 6] },
            { weight: 0.2, count: [7, 8] }
          ]
        }
      },

      // Events will be automatically created through the 'with' relationship
      eventsTable: {
        columns: {
          name: f.weightedRandom([
            { weight: 0.5, value: f.valuesFromArray({ 
              values: indonesianEventTypes.flatMap(type => 
                eventNameSuffixes.map(suffix => type + suffix)
              )
            }) },
            { weight: 0.5, value: f.companyName() }
          ]),
          description: f.loremIpsum({ sentencesCount: 3 }),
          dateTime: f.date({ 
            minDate: '2025-02-01', 
            maxDate: '2025-12-31' 
          }),
          location: f.valuesFromArray({ values: indonesianVenues }),
          posterUrl: f.default({ defaultValue: 'https://via.placeholder.com/400x600' }),
          status: f.weightedRandom([
            { weight: 0.7, value: f.default({ defaultValue: 'published' }) },
            { weight: 0.2, value: f.default({ defaultValue: 'draft' }) },
            { weight: 0.1, value: f.default({ defaultValue: 'cancelled' }) }
          ]),
          totalTickets: f.weightedRandom([
            { weight: 0.4, value: f.int({ minValue: 50, maxValue: 200 }) },   // Small events
            { weight: 0.4, value: f.int({ minValue: 200, maxValue: 1000 }) }, // Medium events
            { weight: 0.2, value: f.int({ minValue: 1000, maxValue: 5000 }) } // Large events
          ]),
          ticketsSold: f.int({ minValue: 0, maxValue: 500 }),
          totalRevenue: f.weightedRandom([
            { weight: 0.3, value: f.default({ defaultValue: '0' }) }, // Free events
            { weight: 0.4, value: f.number({ minValue: 5000000, maxValue: 50000000, precision: 1 }) }, // 5M - 50M IDR  
            { weight: 0.3, value: f.number({ minValue: 50000000, maxValue: 500000000, precision: 1 }) } // 50M - 500M IDR
          ])
        }
      },

      // Create users for authentication testing
      userTable: {
        count: 50,
        columns: {
          name: f.fullName(),
          email: f.email(),
          emailVerified: f.boolean(),
          image: f.default({ defaultValue: 'https://via.placeholder.com/100x100' }),
          createdAt: f.date({ 
            minDate: '2024-01-01', 
            maxDate: '2025-01-31' 
          }),
          updatedAt: f.date({ 
            minDate: '2024-01-01', 
            maxDate: '2025-01-31' 
          })
        }
      },

      // Create sessions for users
      sessionTable: {
        count: 30,
        columns: {
          expiresAt: f.date({ 
            minDate: '2025-03-01', 
            maxDate: '2025-12-31' 
          }),
          token: f.string({ isUnique: true }),
          createdAt: f.date({ 
            minDate: '2024-01-01', 
            maxDate: '2025-01-31' 
          }),
          updatedAt: f.date({ 
            minDate: '2024-01-01', 
            maxDate: '2025-01-31' 
          })
        }
      },

      // Create accounts for OAuth
      accountTable: {
        count: 40,
        columns: {
          accountId: f.string({ isUnique: true }),
          providerId: f.valuesFromArray({ 
            values: ['google', 'github', 'discord', 'facebook'] 
          }),
          accessToken: f.string(),
          refreshToken: f.string(),
          idToken: f.string(),
          accessTokenExpiresAt: f.date({ 
            minDate: '2025-03-01', 
            maxDate: '2025-12-31' 
          }),
          refreshTokenExpiresAt: f.date({ 
            minDate: '2025-06-01', 
            maxDate: '2026-01-31' 
          }),
          scope: f.valuesFromArray({ 
            values: ['read', 'write', 'profile', 'email'] 
          }),
          createdAt: f.date({ 
            minDate: '2024-01-01', 
            maxDate: '2025-01-31' 
          }),
          updatedAt: f.date({ 
            minDate: '2024-01-01', 
            maxDate: '2025-01-31' 
          })
        }
      }
    }))

    console.log('✅ Database seeded successfully!')
    
    console.log('\n👤 TEST USER SETUP INSTRUCTIONS:')
    console.log('To create the test user with proper password hashing:')
    console.log('1. Start the development server: npm run dev')
    console.log('2. Create the test user: npm run seed:user')
    console.log('   OR go to http://localhost:3000/sign-up and create manually')
    console.log('   Email: dwihp.165@gmail.com')
    console.log('   Password: Test@123456')
    console.log('   Name: Test User (Dwi)')
    
    await showSeedSummary()
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')
  
  try {
    await reset(db, schema)
    console.log('✅ Database cleaned successfully!')
    
  } catch (error) {
    console.error('❌ Cleaning failed:', error)
    throw error
  }
}

async function showSeedSummary() {
  console.log('\n📊 Seed Data Summary')
  console.log('=' .repeat(60))
  
  try {
    // Get counts from all tables
    const [organizations] = await db.select({ count: count() }).from(schema.organizationTable)
    const [events] = await db.select({ count: count() }).from(schema.eventsTable)
    const [users] = await db.select({ count: count() }).from(schema.userTable)
    const [sessions] = await db.select({ count: count() }).from(schema.sessionTable)
    const [accounts] = await db.select({ count: count() }).from(schema.accountTable)
    const [members] = await db.select({ count: count() }).from(schema.memberTable)

    console.log(`🏢 Organizations: ${organizations.count}`)
    console.log(`🎪 Events: ${events.count}`)
    console.log(`👥 Users: ${users.count}`)
    console.log(`� Organization Members: ${members.count}`)
    console.log(`�🔐 Sessions: ${sessions.count}`)
    console.log(`🔗 Accounts: ${accounts.count}`)

    // Get event statistics for published events
    const eventStats = await db.select({
      publishedCount: count(),
      totalRevenue: sum(schema.eventsTable.totalRevenue),
      totalTicketsSold: sum(schema.eventsTable.ticketsSold)
    }).from(schema.eventsTable).where(eq(schema.eventsTable.status, 'published'))

    if (eventStats[0]) {
      const totalRevenue = Number(eventStats[0].totalRevenue) || 0
      const totalTicketsSold = Number(eventStats[0].totalTicketsSold) || 0
      
      console.log(`📢 Published Events: ${eventStats[0].publishedCount}`)
      console.log(`💰 Total Revenue: IDR ${totalRevenue.toLocaleString('id-ID')}`)
      console.log(`🎫 Total Tickets Sold: ${totalTicketsSold.toLocaleString('id-ID')}`)
    }

    // Check for test user
    const testUser = await db.select({
      id: schema.userTable.id,
      name: schema.userTable.name,
      email: schema.userTable.email
    }).from(schema.userTable)
      .where(eq(schema.userTable.email, 'dwihp.165@gmail.com'))
      .limit(1)

    if (testUser.length > 0) {
      const testUserOrg = await db.select({
        orgName: schema.organizationTable.name,
        orgSlug: schema.organizationTable.slug,
        role: schema.memberTable.role
      }).from(schema.memberTable)
        .leftJoin(schema.organizationTable, eq(schema.memberTable.organizationId, schema.organizationTable.id))
        .where(eq(schema.memberTable.userId, testUser[0].id))
        .limit(1)

      console.log('\n👤 TEST USER STATUS:')
      console.log(`✅ Test user exists: ${testUser[0].name} (${testUser[0].email})`)
      if (testUserOrg.length > 0) {
        console.log(`✅ Organization: ${testUserOrg[0].orgName} (${testUserOrg[0].role})`)
        console.log(`✅ Ready for dashboard access`)
      } else {
        console.log(`⚠️  No organization membership found`)
      }
    } else {
      console.log('\n👤 TEST USER STATUS:')
      console.log(`❌ Test user not found`)
    }

    console.log('\n🎯 Indonesian Market Features:')
    console.log('✅ Indonesian city names and venues')
    console.log('✅ Local event types and naming conventions')
    console.log('✅ IDR currency formatting')
    console.log('✅ Realistic Indonesian company names')
    console.log('✅ Multi-tenant organization structure')
    console.log('✅ Complete test user with organization membership')

  } catch (error) {
    console.error('❌ Error generating summary:', error)
  }
}

async function main() {
  const command = process.argv[2] || 'seed'
  
  console.log('🌱 GATHERLY DRIZZLE-SEED TOOL')
  console.log('=' .repeat(60))
  
  try {
    switch (command) {
      case 'clean':
        await cleanDatabase()
        break
        
      case 'reset':
        await cleanDatabase()
        await seedDatabase()
        console.log('\n✅ Database reset successfully!')
        break
        
      case 'summary':
        await showSeedSummary()
        break
        
      case 'seed':
      default:
        await seedDatabase()
        break
    }
    
    console.log('\n🎯 Available commands:')
    console.log('   npm run seed        # Populate seed data')
    console.log('   npm run seed:clean  # Clean all seed data')  
    console.log('   npm run seed:reset  # Clean and repopulate')
    console.log('   npm run seed:summary # Show current seed data summary')
    
  } catch (error) {
    console.error('\n💥 Operation failed:', error)
    process.exit(1)
  }
}

main()
