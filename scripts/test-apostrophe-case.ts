/**
 * Test the specific issue case
 * Location: scripts/test-apostrophe-case.ts
 */
import { generateSlug } from '../src/lib/utils/slug'
import { PublicationSettingsSchema } from '../src/app/events/models/interfaces/eventForm'

const testCase = "Dwi's Tech Meetup Jakarta 2025"
console.log('🧪 Testing Apostrophe Case')
console.log('=' .repeat(40))
console.log(`Input: "${testCase}"`)

const slug = generateSlug(testCase)
console.log(`Generated: "${slug}"`)

// Test schema compliance
const result = PublicationSettingsSchema.shape.slug.safeParse(slug)
console.log(`Schema Valid: ${result.success ? '✅' : '❌'}`)

if (!result.success) {
  console.log('Errors:')
  result.error.issues.forEach(issue => {
    console.log(`  - ${issue.message}`)
  })
}

// Test regex pattern directly
const regexTest = /^[a-z0-9-]+$/.test(slug)
console.log(`Regex Test: ${regexTest ? '✅' : '❌'}`)
console.log(`Length: ${slug.length} characters`)

// Test other problematic characters
const problematicCases = [
  "Event's Name",
  "Café & Restaurant",
  "100% Success Rate",
  "Tech@Company Meeting",
  "Art & Culture Night",
  "Rock 'n' Roll Concert",
  "French: Très Bien!",
  "Email: contact@event.com",
]

console.log('\n🔍 Testing Other Problematic Characters')
console.log('=' .repeat(40))

problematicCases.forEach(testInput => {
  const generated = generateSlug(testInput)
  const isValid = PublicationSettingsSchema.shape.slug.safeParse(generated).success
  console.log(`"${testInput}" → "${generated}" ${isValid ? '✅' : '❌'}`)
})
