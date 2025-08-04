/**
 * Database Health Check Script for Gatherly
 * 
 * This script performs quick health checks on the database:
 * - Connection status
 * - Basic table accessibility
 * - Record counts
 * - Recent data validation
 * - Performance metrics
 * 
 * Usage: npm run test:db:health or npx tsx scripts/test-db-health.ts
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
import { count, eq, gte } from 'drizzle-orm'

interface HealthCheckResult {
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL'
  message: string
  details?: Record<string, unknown>
}

interface HealthSummary {
  overall: 'HEALTHY' | 'WARNING' | 'CRITICAL'
  checks: Record<string, HealthCheckResult>
  timestamp: string
}

class DatabaseHealthChecker {
  private checks: Record<string, HealthCheckResult> = {}

  async runHealthCheck(): Promise<HealthSummary> {
    console.log('🏥 Running Database Health Check...\n')

    // Connection check
    await this.checkConnection()
    
    // Table accessibility checks
    await this.checkTableAccessibility()
    
    // Data integrity checks
    await this.checkDataIntegrity()
    
    // Performance checks
    await this.checkPerformance()
    
    // Recent activity checks
    await this.checkRecentActivity()

    const overall = this.determineOverallHealth()
    
    return {
      overall,
      checks: this.checks,
      timestamp: new Date().toISOString()
    }
  }

  private async checkConnection(): Promise<void> {
    try {
      const startTime = Date.now()
      await db.select().from(organizationTable).limit(1)
      const responseTime = Date.now() - startTime
      
      this.checks.connection = {
        status: responseTime < 1000 ? 'HEALTHY' : 'WARNING',
        message: `Database connection successful (${responseTime}ms)`,
        details: { responseTime }
      }
    } catch (error) {
      this.checks.connection = {
        status: 'CRITICAL',
        message: 'Database connection failed',
        details: { error: error instanceof Error ? error.message : String(error) }
      }
    }
  }

  private async checkTableAccessibility(): Promise<void> {
    const tables = [
      { name: 'users', table: userTable },
      { name: 'organizations', table: organizationTable },
      { name: 'events', table: eventsTable },
      { name: 'members', table: memberTable },
      { name: 'sessions', table: sessionTable },
      { name: 'tickets', table: ticketsTable }
    ]

    const accessibleTables: string[] = []
    const inaccessibleTables: string[] = []

    for (const { name, table } of tables) {
      try {
        await db.select().from(table).limit(1)
        accessibleTables.push(name)
      } catch {
        inaccessibleTables.push(name)
      }
    }

    this.checks.tableAccessibility = {
      status: inaccessibleTables.length === 0 ? 'HEALTHY' : 'CRITICAL',
      message: `${accessibleTables.length}/${tables.length} tables accessible`,
      details: { 
        accessible: accessibleTables, 
        inaccessible: inaccessibleTables 
      }
    }
  }

  private async checkDataIntegrity(): Promise<void> {
    try {
      // Get counts from all major tables
      const [orgCount] = await db.select({ count: count() }).from(organizationTable)
      const [eventCount] = await db.select({ count: count() }).from(eventsTable)
      const [userCount] = await db.select({ count: count() }).from(userTable)
      const [memberCount] = await db.select({ count: count() }).from(memberTable)
      const [sessionCount] = await db.select({ count: count() }).from(sessionTable)
      const [ticketCount] = await db.select({ count: count() }).from(ticketsTable)

      const counts = {
        organizations: orgCount.count,
        events: eventCount.count,
        users: userCount.count,
        members: memberCount.count,
        sessions: sessionCount.count,
        tickets: ticketCount.count
      }

      // Check for data consistency issues
      const issues: string[] = []
      
      // Check if there are events without organizations (should not happen due to FK)
      if (eventCount.count > 0 && orgCount.count === 0) {
        issues.push('Events exist without organizations')
      }
      
      // Check if there are members without users or organizations
      if (memberCount.count > 0 && (userCount.count === 0 || orgCount.count === 0)) {
        issues.push('Members exist without users or organizations')
      }

      // Check for reasonable data ratios
      if (eventCount.count > orgCount.count * 100) {
        issues.push('Unusually high event-to-organization ratio')
      }

      this.checks.dataIntegrity = {
        status: issues.length === 0 ? 'HEALTHY' : 'WARNING',
        message: issues.length === 0 ? 'Data integrity checks passed' : `${issues.length} integrity issue(s) found`,
        details: { counts, issues }
      }
    } catch (error) {
      this.checks.dataIntegrity = {
        status: 'CRITICAL',
        message: 'Data integrity check failed',
        details: { error: error instanceof Error ? error.message : String(error) }
      }
    }
  }

  private async checkPerformance(): Promise<void> {
    try {
      const performanceTests = [
        { name: 'Simple Select', fn: () => db.select().from(organizationTable).limit(10) },
        { name: 'Join Query', fn: () => db.select({
          eventName: eventsTable.name,
          orgName: organizationTable.name
        })
        .from(eventsTable)
        .leftJoin(organizationTable, eq(eventsTable.organizationId, organizationTable.id))
        .limit(10) },
        { name: 'Count Query', fn: () => db.select({ count: count() }).from(eventsTable) }
      ]

      const results: Record<string, number> = {}
      let totalTime = 0

      for (const test of performanceTests) {
        const startTime = Date.now()
        await test.fn()
        const duration = Date.now() - startTime
        results[test.name] = duration
        totalTime += duration
      }

      const avgTime = totalTime / performanceTests.length

      this.checks.performance = {
        status: avgTime < 500 ? 'HEALTHY' : avgTime < 2000 ? 'WARNING' : 'CRITICAL',
        message: `Average query time: ${avgTime.toFixed(0)}ms`,
        details: results
      }
    } catch (error) {
      this.checks.performance = {
        status: 'CRITICAL',
        message: 'Performance check failed',
        details: { error: error instanceof Error ? error.message : String(error) }
      }
    }
  }

  private async checkRecentActivity(): Promise<void> {
    try {
      // Check for recent data (within last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      
      const [recentOrgs] = await db.select({ count: count() })
        .from(organizationTable)
        .where(gte(organizationTable.createdAt, sevenDaysAgo))
      
      const [recentEvents] = await db.select({ count: count() })
        .from(eventsTable)
        .where(gte(eventsTable.createdAt, sevenDaysAgo))
      
      const [recentUsers] = await db.select({ count: count() })
        .from(userTable)
        .where(gte(userTable.createdAt, sevenDaysAgo))

      // Check for recent sessions (active users)
      const [recentSessions] = await db.select({ count: count() })
        .from(sessionTable)
        .where(gte(sessionTable.expiresAt, new Date()))

      const recentActivity = {
        organizations: recentOrgs.count,
        events: recentEvents.count,
        users: recentUsers.count,
        activeSessions: recentSessions.count
      }

      const totalRecentActivity = recentActivity.organizations + recentActivity.events + recentActivity.users
      
      this.checks.recentActivity = {
        status: recentActivity.activeSessions > 0 ? 'HEALTHY' : 'WARNING',
        message: `${totalRecentActivity} new records in last 7 days, ${recentActivity.activeSessions} active sessions`,
        details: recentActivity
      }
    } catch (error) {
      this.checks.recentActivity = {
        status: 'WARNING',
        message: 'Recent activity check failed',
        details: { error: error instanceof Error ? error.message : String(error) }
      }
    }
  }

  private determineOverallHealth(): 'HEALTHY' | 'WARNING' | 'CRITICAL' {
    const statuses = Object.values(this.checks).map(check => check.status)
    
    if (statuses.includes('CRITICAL')) {
      return 'CRITICAL'
    } else if (statuses.includes('WARNING')) {
      return 'WARNING'
    } else {
      return 'HEALTHY'
    }
  }

  printResults(summary: HealthSummary): void {
    console.log('\n' + '='.repeat(60))
    console.log('🏥 DATABASE HEALTH CHECK RESULTS')
    console.log('='.repeat(60))
    
    // Overall status with colored indicator
    const statusIcon = {
      'HEALTHY': '✅',
      'WARNING': '⚠️',
      'CRITICAL': '🚨'
    }[summary.overall]
    
    console.log(`${statusIcon} Overall Status: ${summary.overall}`)
    console.log(`🕐 Check Time: ${new Date(summary.timestamp).toLocaleString()}`)
    console.log('')

    // Individual check results
    Object.entries(summary.checks).forEach(([checkName, result]) => {
      const statusIcons = {
        'HEALTHY': '✅',
        'WARNING': '⚠️',
        'CRITICAL': '🚨'
      } as const
      const icon = statusIcons[result.status]
      console.log(`${icon} ${checkName.charAt(0).toUpperCase() + checkName.slice(1)}`)
      console.log(`   ${result.message}`)
      
      if (result.details && Object.keys(result.details).length > 0) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2).replace(/\n/g, '\n   ')}`)
      }
      console.log('')
    })

    // Recommendations based on status
    if (summary.overall === 'CRITICAL') {
      console.log('🚨 CRITICAL ISSUES DETECTED:')
      console.log('   • Immediate attention required')
      console.log('   • Database may be unavailable or corrupted')
      console.log('   • Check connection settings and database status')
    } else if (summary.overall === 'WARNING') {
      console.log('⚠️  WARNINGS DETECTED:')
      console.log('   • Monitor the situation closely')
      console.log('   • Consider optimization or maintenance')
      console.log('   • Performance may be degraded')
    } else {
      console.log('✅ SYSTEM HEALTHY:')
      console.log('   • All checks passed successfully')
      console.log('   • Database is operating normally')
      console.log('   • No immediate action required')
    }

    console.log('\n💡 Health Check Tips:')
    console.log('   • Run this check regularly to monitor database health')
    console.log('   • Set up automated alerts for CRITICAL status')
    console.log('   • Use `npm run test:db:advanced` for detailed testing')
    console.log('   • Check logs if any issues are detected')
  }
}

async function main() {
  const checker = new DatabaseHealthChecker()
  
  try {
    const summary = await checker.runHealthCheck()
    checker.printResults(summary)
    
    // Exit with appropriate code
    process.exit(summary.overall === 'CRITICAL' ? 1 : 0)
  } catch (error) {
    console.error('💥 Health check runner failed:', error)
    process.exit(1)
  }
}

main()
