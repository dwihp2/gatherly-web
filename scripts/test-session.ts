/**
 * Test script to check the current session response
 * and organization information
 */
import { db } from '../src/lib/db'
import { userTable, organizationTable, memberTable } from '../src/lib/db/schema'
import { eq } from 'drizzle-orm'

async function testSession() {
  try {
    console.log('🔍 Testing session and organization setup...\n')

    // 1. Check if we have any users in the database
    const users = await db.select().from(userTable).limit(5)
    console.log('👥 Users in database:', users.length)
    if (users.length > 0) {
      console.log('First user:', {
        id: users[0].id,
        email: users[0].email,
        name: users[0].name
      })
    }

    // 2. Check if we have any organizations
    const organizations = await db.select().from(organizationTable).limit(5)
    console.log('\n🏢 Organizations in database:', organizations.length)
    if (organizations.length > 0) {
      console.log('First organization:', {
        id: organizations[0].id,
        name: organizations[0].name,
        slug: organizations[0].slug
      })
    }

    // 3. Check memberships
    const memberships = await db
      .select({
        userId: memberTable.userId,
        organizationId: memberTable.organizationId,
        role: memberTable.role,
        organizationName: organizationTable.name,
        userEmail: userTable.email
      })
      .from(memberTable)
      .innerJoin(organizationTable, eq(memberTable.organizationId, organizationTable.id))
      .innerJoin(userTable, eq(memberTable.userId, userTable.id))
      .limit(5)

    console.log('\n🤝 Memberships in database:', memberships.length)
    memberships.forEach((membership, index) => {
      console.log(`Membership ${index + 1}:`, {
        user: membership.userEmail,
        organization: membership.organizationName,
        role: membership.role
      })
    })

    // 4. If we have a user, test the getUserActiveOrganization function
    if (users.length > 0) {
      const testUserId = users[0].id
      console.log(`\n🔍 Testing getUserActiveOrganization for user: ${users[0].email}`)

      // This is the same function we added to auth.ts
      const membershipResult = await db
        .select({
          organizationId: memberTable.organizationId,
          organizationName: organizationTable.name,
          role: memberTable.role
        })
        .from(memberTable)
        .innerJoin(organizationTable, eq(memberTable.organizationId, organizationTable.id))
        .where(eq(memberTable.userId, testUserId))
        .limit(1)

      if (membershipResult.length > 0) {
        console.log('✅ Found active organization:', {
          id: membershipResult[0].organizationId,
          name: membershipResult[0].organizationName,
          role: membershipResult[0].role
        })
      } else {
        console.log('❌ No organization found for this user')
        console.log('💡 This user needs to be added to an organization')
      }
    }

  } catch (error) {
    console.error('❌ Error testing session:', error)
  } finally {
    process.exit(0)
  }
}

// Run the test
testSession()
