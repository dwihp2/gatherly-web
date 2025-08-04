/**
 * Database Connection Test Script for Gatherly
 * 
 * This script tests the basic database connection and performs
 * simple CRUD operations to verify database functionality.
 * 
 * Usage: npm run test:db or npx tsx scripts/test-db.ts
 */

import { db } from '../src/lib/db/index'
import { eventsTable, organizationTable } from '../src/lib/db/schema'
import { generateSlug } from '../src/lib/utils/slug'
import { eq } from 'drizzle-orm'

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection by querying events
    const result = await db.select().from(eventsTable).limit(1)
    console.log('✅ Database connection successful!')
    console.log(`📊 Found ${result.length} existing events in database`)
    
    // Step 1: Create a test organization first
    console.log('\n🏢 Creating test organization...')
    const testOrg = {
      name: 'Test Organization',
      slug: 'test-org-' + Date.now(),
    }
    
    const [createdOrg] = await db.insert(organizationTable).values(testOrg).returning()
    console.log('✅ Test organization created!')
    console.log(`   🆔 Organization ID: ${createdOrg.id}`)
    
    // Step 2: Test event creation with valid organization ID
    console.log('\n🧪 Testing event creation...')
    const eventName = 'Test Event - ' + new Date().toISOString()
    const testEvent = {
      organizationId: createdOrg.id, // Use the created organization ID
      name: eventName,
      slug: generateSlug(eventName),
      dateTime: new Date('2025-12-01T19:00:00Z'),
      location: 'Test Location',
      status: 'draft' as const,
      totalTickets: 100,
      ticketsSold: 0,
      totalRevenue: '0',
    }
    
    const [createdEvent] = await db.insert(eventsTable).values(testEvent).returning()
    console.log('✅ Test event created successfully!')
    console.log('📝 Event ID:', createdEvent.id)
    console.log('📅 Event Name:', createdEvent.name)
    console.log('🏢 Organization ID:', createdEvent.organizationId)
    
    // Test reading the created event
    const fetchedEvent = await db.select().from(eventsTable).where(eq(eventsTable.id, createdEvent.id))
    console.log('✅ Test event fetched successfully!')
    console.log('📖 Fetched event name:', fetchedEvent[0]?.name)
    
    // Clean up test event and organization
    await db.delete(eventsTable).where(eq(eventsTable.id, createdEvent.id))
    console.log('🧹 Test event cleaned up')
    
    await db.delete(organizationTable).where(eq(organizationTable.id, createdOrg.id))
    console.log('🧹 Test organization cleaned up')
    
    console.log('\n🎉 All database tests passed!')
    console.log('💾 Database is ready for event creation!')
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    if (errorMessage.includes('ECONNREFUSED')) {
      console.log('\n💡 PostgreSQL Connection Issue:')
      console.log('   Make sure PostgreSQL is running on localhost:5432')
      console.log('   You can start it with:')
      console.log('   • brew services start postgresql (macOS)')
      console.log('   • sudo systemctl start postgresql (Linux)')
      console.log('   • Or with Docker:')
      console.log('     docker run -d --name gatherly-postgres \\')
      console.log('       -p 5432:5432 \\')
      console.log('       -e POSTGRES_DB=gatherly_db \\')
      console.log('       -e POSTGRES_USER=gatherly_user \\')
      console.log('       -e POSTGRES_PASSWORD=gatherly_pass \\')
      console.log('       postgres:15')
    }
    
    if (errorMessage.includes('database') && errorMessage.includes('does not exist')) {
      console.log('\n💡 Database Setup Required:')
      console.log('   Create the database and user:')
      console.log('   psql -c "CREATE DATABASE gatherly_db;"')
      console.log('   psql -c "CREATE USER gatherly_user WITH PASSWORD \'gatherly_pass\';"')
      console.log('   psql -c "GRANT ALL PRIVILEGES ON DATABASE gatherly_db TO gatherly_user;"')
      console.log('   ')
      console.log('   Then run migrations:')
      console.log('   npm run db:migrate')
    }
    
    if (errorMessage.includes('relation') && errorMessage.includes('does not exist')) {
      console.log('\n💡 Database Migration Required:')
      console.log('   Run database migrations:')
      console.log('   npm run db:migrate')
    }
    
    process.exit(1)
  }
}

testDatabaseConnection()
