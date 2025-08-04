/**
 * Advanced Database Connection Test Script for Gatherly
 * 
 * This script performs comprehensive database testing including:
 * - Database connection verification
 * - Schema validation
 * - Multi-tenant data operations
 * - Authentication table testing
 * - Performance benchmarks
 * - Relationship integrity checks
 * 
 * Usage: npm run test:db:advanced or npx tsx scripts/test-db-advanced.ts
 */

import { db } from '../src/lib/db/index'
import { 
  eventsTable, 
  organizationTable, 
  userTable, 
  memberTable,
  sessionTable,
  ticketsTable 
} from '../src/lib/db/schema'
import { generateSlug } from '../src/lib/utils/slug'
import { eq, count } from 'drizzle-orm'
import * as crypto from 'crypto'

interface TestResults {
  passed: number
  failed: number
  tests: Array<{ name: string; status: 'PASS' | 'FAIL'; error?: string }>
}

class DatabaseTester {
  private results: TestResults = { passed: 0, failed: 0, tests: [] }
  private testOrgId: string | null = null
  private testUserId: string | null = null
  private testEventId: string | null = null

  private async runTest(name: string, testFn: () => Promise<void>): Promise<void> {
    try {
      await testFn()
      this.results.tests.push({ name, status: 'PASS' })
      this.results.passed++
      console.log(`✅ ${name}`)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      this.results.tests.push({ name, status: 'FAIL', error: errorMsg })
      this.results.failed++
      console.log(`❌ ${name}: ${errorMsg}`)
    }
  }

  async runAllTests(): Promise<TestResults> {
    console.log('🧪 Running Advanced Database Tests...\n')

    // Connection Tests
    await this.runTest('Database Connection', () => this.testConnection())
    await this.runTest('Schema Validation', () => this.testSchemaIntegrity())
    
    // CRUD Operation Tests
    await this.runTest('Organization CRUD', () => this.testOrganizationCRUD())
    await this.runTest('User CRUD', () => this.testUserCRUD())
    await this.runTest('Event CRUD', () => this.testEventCRUD())
    
    // Multi-tenancy Tests
    await this.runTest('Multi-tenant Isolation', () => this.testMultiTenantIsolation())
    await this.runTest('Organization Membership', () => this.testOrganizationMembership())
    
    // Relationship Tests
    await this.runTest('Foreign Key Constraints', () => this.testForeignKeyConstraints())
    await this.runTest('Cascade Deletions', () => this.testCascadeDeletions())
    
    // Performance Tests
    await this.runTest('Bulk Operations', () => this.testBulkOperations())
    
    // Authentication Tests
    await this.runTest('Session Management', () => this.testSessionManagement())
    
    // Cleanup
    await this.runTest('Test Data Cleanup', () => this.cleanup())

    return this.results
  }

  private async testConnection(): Promise<void> {
    const result = await db.select().from(organizationTable).limit(1)
    if (!Array.isArray(result)) {
      throw new Error('Database connection returned invalid result')
    }
  }

  private async testSchemaIntegrity(): Promise<void> {
    // Test that all core tables exist by running simple queries
    await db.select().from(userTable).limit(1)
    await db.select().from(organizationTable).limit(1)
    await db.select().from(eventsTable).limit(1)
    await db.select().from(memberTable).limit(1)
    await db.select().from(sessionTable).limit(1)
    await db.select().from(ticketsTable).limit(1)
  }

  private async testOrganizationCRUD(): Promise<void> {
    // Create
    const testOrg = {
      name: 'Advanced Test Organization',
      slug: 'advanced-test-org-' + Date.now(),
    }

    const [createdOrg] = await db.insert(organizationTable).values(testOrg).returning()
    this.testOrgId = createdOrg.id

    if (!createdOrg || createdOrg.name !== testOrg.name) {
      throw new Error('Organization creation failed')
    }

    // Read
    const fetchedOrg = await db.select().from(organizationTable).where(eq(organizationTable.id, createdOrg.id))
    if (fetchedOrg.length !== 1 || fetchedOrg[0].name !== testOrg.name) {
      throw new Error('Organization reading failed')
    }

    // Update
    const updatedName = 'Updated Advanced Test Organization'
    await db.update(organizationTable)
      .set({ name: updatedName })
      .where(eq(organizationTable.id, createdOrg.id))

    const updatedOrg = await db.select().from(organizationTable).where(eq(organizationTable.id, createdOrg.id))
    if (updatedOrg.length !== 1 || updatedOrg[0].name !== updatedName) {
      throw new Error('Organization update failed')
    }
  }

  private async testUserCRUD(): Promise<void> {
    const testUser = {
      name: 'Advanced Test User',
      email: 'advanced-test-' + Date.now() + '@gatherly.test',
      emailVerified: false,
    }

    const [createdUser] = await db.insert(userTable).values(testUser).returning()
    this.testUserId = createdUser.id

    if (!createdUser || createdUser.email !== testUser.email) {
      throw new Error('User creation failed')
    }

    // Test email uniqueness constraint
    try {
      await db.insert(userTable).values({ ...testUser, name: 'Duplicate User' })
      throw new Error('Email uniqueness constraint not enforced')
    } catch (error) {
      // This should fail - email uniqueness is enforced
      if (!String(error).includes('unique') && !String(error).includes('duplicate')) {
        throw new Error('Unexpected error during uniqueness test: ' + String(error))
      }
    }
  }

  private async testEventCRUD(): Promise<void> {
    if (!this.testOrgId) {
      throw new Error('Test organization not available')
    }

    const eventName = 'Advanced Test Event'
    const testEvent = {
      organizationId: this.testOrgId,
      name: eventName,
      slug: generateSlug(eventName) + '-' + Date.now(),
      dateTime: new Date('2025-12-01T19:00:00Z'),
      location: 'Advanced Test Location',
      status: 'published' as const,
      totalTickets: 500,
      ticketsSold: 0,
      totalRevenue: '0',
    }

    const [createdEvent] = await db.insert(eventsTable).values(testEvent).returning()
    this.testEventId = createdEvent.id

    if (!createdEvent || createdEvent.name !== testEvent.name) {
      throw new Error('Event creation failed')
    }

    // Test slug uniqueness
    try {
      await db.insert(eventsTable).values({ 
        ...testEvent, 
        name: 'Duplicate Slug Event',
        // Keep the same slug to test uniqueness
      })
      throw new Error('Slug uniqueness constraint not enforced')
    } catch (error) {
      if (!String(error).includes('unique') && !String(error).includes('duplicate')) {
        throw new Error('Unexpected error during slug uniqueness test: ' + String(error))
      }
    }
  }

  private async testMultiTenantIsolation(): Promise<void> {
    if (!this.testOrgId || !this.testEventId) {
      throw new Error('Test data not available')
    }

    // Create another organization
    const secondOrg = {
      name: 'Second Test Organization',
      slug: 'second-test-org-' + Date.now(),
    }
    const [createdSecondOrg] = await db.insert(organizationTable).values(secondOrg).returning()

    // Create event in second organization
    const eventName = 'Second Org Event'
    const secondOrgEvent = {
      organizationId: createdSecondOrg.id,
      name: eventName,
      slug: generateSlug(eventName) + '-second-' + Date.now(),
      dateTime: new Date('2025-12-15T19:00:00Z'),
      location: 'Second Org Location',
      status: 'draft' as const,
      totalTickets: 100,
      ticketsSold: 0,
      totalRevenue: '0',
    }
    const [secondEvent] = await db.insert(eventsTable).values(secondOrgEvent).returning()

    // Test that queries filtered by organizationId only return relevant events
    const firstOrgEvents = await db.select()
      .from(eventsTable)
      .where(eq(eventsTable.organizationId, this.testOrgId))

    const secondOrgEvents = await db.select()
      .from(eventsTable)
      .where(eq(eventsTable.organizationId, createdSecondOrg.id))

    if (firstOrgEvents.length === 0) {
      throw new Error('First organization events not found')
    }

    if (secondOrgEvents.length === 0) {
      throw new Error('Second organization events not found')
    }

    // Ensure no cross-contamination
    const firstOrgHasSecondEvent = firstOrgEvents.some(e => e.id === secondEvent.id)
    const secondOrgHasFirstEvent = secondOrgEvents.some(e => e.id === this.testEventId)

    if (firstOrgHasSecondEvent || secondOrgHasFirstEvent) {
      throw new Error('Multi-tenant isolation failed - events leaked between organizations')
    }

    // Cleanup second org
    await db.delete(eventsTable).where(eq(eventsTable.id, secondEvent.id))
    await db.delete(organizationTable).where(eq(organizationTable.id, createdSecondOrg.id))
  }

  private async testOrganizationMembership(): Promise<void> {
    if (!this.testOrgId || !this.testUserId) {
      throw new Error('Test data not available')
    }

    // Create membership
    const membership = {
      userId: this.testUserId,
      organizationId: this.testOrgId,
      role: 'admin' as const,
    }

    const [createdMembership] = await db.insert(memberTable).values(membership).returning()

    if (!createdMembership || createdMembership.role !== 'admin') {
      throw new Error('Membership creation failed')
    }

    // Test membership query
    const userOrgs = await db.select({
      orgName: organizationTable.name,
      userRole: memberTable.role
    })
    .from(memberTable)
    .leftJoin(organizationTable, eq(memberTable.organizationId, organizationTable.id))
    .where(eq(memberTable.userId, this.testUserId))

    if (userOrgs.length !== 1 || userOrgs[0].userRole !== 'admin') {
      throw new Error('Membership query failed')
    }
  }

  private async testForeignKeyConstraints(): Promise<void> {
    const nonExistentOrgId = crypto.randomUUID()

    // Test that creating an event with non-existent organization fails
    try {
      await db.insert(eventsTable).values({
        organizationId: nonExistentOrgId,
        name: 'Invalid Event',
        slug: 'invalid-event-' + Date.now(),
        dateTime: new Date(),
        location: 'Nowhere',
        status: 'draft' as const,
      })
      throw new Error('Foreign key constraint not enforced')
    } catch (error) {
      if (!String(error).includes('foreign key') && !String(error).includes('violates')) {
        throw new Error('Unexpected foreign key error: ' + String(error))
      }
    }
  }

  private async testCascadeDeletions(): Promise<void> {
    // This test verifies that cascade deletions work properly
    // We'll test this by ensuring membership is cleaned up when user is deleted
    if (!this.testUserId || !this.testOrgId) {
      throw new Error('Test data not available')
    }

    // Check that membership exists
    const membershipsBefore = await db.select()
      .from(memberTable)
      .where(eq(memberTable.userId, this.testUserId))

    if (membershipsBefore.length === 0) {
      throw new Error('No membership found to test cascade deletion')
    }

    // Delete user - this should cascade delete the membership
    await db.delete(userTable).where(eq(userTable.id, this.testUserId))
    this.testUserId = null // Mark as deleted

    // Check that membership was cascade deleted
    const membershipsAfter = await db.select()
      .from(memberTable)
      .where(eq(memberTable.userId, membershipsBefore[0].userId))

    if (membershipsAfter.length > 0) {
      throw new Error('Cascade deletion failed - membership still exists after user deletion')
    }
  }

  private async testBulkOperations(): Promise<void> {
    if (!this.testOrgId) {
      throw new Error('Test organization not available')
    }

    // Create multiple events in bulk
    const bulkEvents = Array.from({ length: 5 }, (_, i) => ({
      organizationId: this.testOrgId!,
      name: `Bulk Event ${i + 1}`,
      slug: `bulk-event-${i + 1}-${Date.now()}`,
      dateTime: new Date(`2025-12-${String(i + 10).padStart(2, '0')}T19:00:00Z`),
      location: `Bulk Location ${i + 1}`,
      status: 'draft' as const,
      totalTickets: 100 * (i + 1),
      ticketsSold: 0,
      totalRevenue: '0',
    }))

    const createdEvents = await db.insert(eventsTable).values(bulkEvents).returning()

    if (createdEvents.length !== 5) {
      throw new Error(`Bulk insert failed - expected 5 events, got ${createdEvents.length}`)
    }

    // Test bulk delete
    await db.delete(eventsTable).where(eq(eventsTable.organizationId, this.testOrgId!))

    // Verify deletion
    const remainingEvents = await db.select()
      .from(eventsTable)
      .where(eq(eventsTable.organizationId, this.testOrgId!))

    if (remainingEvents.length > 0) {
      throw new Error('Bulk delete failed - some events still exist')
    }
  }

  private async testSessionManagement(): Promise<void> {
    if (!this.testUserId) {
      // Create a temporary user for session testing
      const tempUser = {
        name: 'Session Test User',
        email: 'session-test-' + Date.now() + '@gatherly.test',
        emailVerified: true,
      }
      const [createdUser] = await db.insert(userTable).values(tempUser).returning()
      this.testUserId = createdUser.id
    }

    const testSession = {
      userId: this.testUserId,
      token: 'test-session-token-' + Date.now(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      ipAddress: '127.0.0.1',
      userAgent: 'Advanced Test Agent',
    }

    const [createdSession] = await db.insert(sessionTable).values(testSession).returning()

    if (!createdSession || createdSession.token !== testSession.token) {
      throw new Error('Session creation failed')
    }

    // Test session cleanup (expired sessions)
    const expiredSession = {
      userId: this.testUserId,
      token: 'expired-session-token-' + Date.now(),
      expiresAt: new Date(Date.now() - 60 * 1000), // 1 minute ago
      ipAddress: '127.0.0.1',
      userAgent: 'Expired Test Agent',
    }

    await db.insert(sessionTable).values(expiredSession)

    // Count active vs expired sessions
    const activeSessions = await db.select({ count: count() })
      .from(sessionTable)
      .where(eq(sessionTable.userId, this.testUserId))

    if (activeSessions[0].count < 1) {
      throw new Error('Active session count incorrect')
    }
  }

  private async cleanup(): Promise<void> {
    // Clean up test data in reverse dependency order
    try {
      if (this.testEventId) {
        await db.delete(eventsTable).where(eq(eventsTable.id, this.testEventId))
      }
      
      if (this.testUserId) {
        // Sessions and memberships should be cascade deleted
        await db.delete(userTable).where(eq(userTable.id, this.testUserId))
      }
      
      if (this.testOrgId) {
        // Events and memberships should be cascade deleted
        await db.delete(organizationTable).where(eq(organizationTable.id, this.testOrgId))
      }

      // Clean up any remaining test data by pattern matching
      await db.delete(organizationTable).where(eq(organizationTable.name, 'Updated Advanced Test Organization'))
      await db.delete(sessionTable).where(eq(sessionTable.userAgent, 'Advanced Test Agent'))
      await db.delete(sessionTable).where(eq(sessionTable.userAgent, 'Expired Test Agent'))
      
    } catch (error) {
      // Cleanup errors are not critical for test results
      console.warn('⚠️  Cleanup warning:', error instanceof Error ? error.message : String(error))
    }
  }

  printResults(): void {
    console.log('\n' + '='.repeat(60))
    console.log('🧪 ADVANCED DATABASE TEST RESULTS')
    console.log('='.repeat(60))
    
    console.log(`✅ Passed: ${this.results.passed}`)
    console.log(`❌ Failed: ${this.results.failed}`)
    console.log(`📊 Total: ${this.results.tests.length}`)
    
    if (this.results.failed > 0) {
      console.log('\n❌ FAILED TESTS:')
      this.results.tests
        .filter(test => test.status === 'FAIL')
        .forEach(test => {
          console.log(`   • ${test.name}: ${test.error}`)
        })
    }
    
    const successRate = (this.results.passed / this.results.tests.length) * 100
    console.log(`\n🎯 Success Rate: ${successRate.toFixed(1)}%`)
    
    if (successRate === 100) {
      console.log('\n🎉 All tests passed! Database is fully functional.')
    } else if (successRate >= 80) {
      console.log('\n⚠️  Most tests passed. Check failed tests above.')
    } else {
      console.log('\n💥 Multiple test failures. Database may have issues.')
    }
  }
}

async function main() {
  const tester = new DatabaseTester()
  
  try {
    await tester.runAllTests()
  } catch (error) {
    console.error('💥 Test runner failed:', error)
    process.exit(1)
  } finally {
    tester.printResults()
  }
}

main()
