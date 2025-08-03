/**
 * Schema Compliance Test for generateSlug
 * Location: scripts/test-slug-schema.ts
 */
import { generateSlug, isValidSlug } from '../src/lib/utils/slug'
import { PublicationSettingsSchema } from '../src/app/events/models/interfaces/eventForm'

// Test cases that should work
const testCases = [
  'Jakarta Music Festival',
  'CONFERENCE 2024',
  'Tech@Meetup #1',
  'Bali Wedding Expo',
  'Art & Culture Night',
  'Gaming Tournament!!!',
  'Startup Pitch Day',
  '     Leading and trailing spaces     ',
  'Multiple    spaces    between    words',
  'Special-chars-@#$%^&*()',
  'unicode-characters-café-naïve',
  'Very long event name that exceeds the normal length limit and should be truncated properly to ensure it fits within the 100 character limit imposed by the schema validation rules',
  'ab', // Too short
  '', // Empty
  'a',  // Single character
  'Hello---World', // Multiple hyphens
  '123 Number Event',
  'Event with émojis 🎉🎊'
]

console.log('🧪 Testing Slug Generation vs Schema Validation')
console.log('=' .repeat(60))

let failCount = 0

testCases.forEach((testCase, index) => {
  const slug = generateSlug(testCase)
  
  // Test with Zod schema
  const schemaResult = PublicationSettingsSchema.shape.slug.safeParse(slug)
  const isValidResult = isValidSlug(slug)
  
  console.log(`\nTest ${index + 1}:`)
  console.log(`Input:        "${testCase}"`)
  console.log(`Generated:    "${slug}"`)
  console.log(`Length:       ${slug.length} chars`)
  console.log(`Manual Valid: ${isValidResult ? '✅' : '❌'}`)
  console.log(`Schema Valid: ${schemaResult.success ? '✅' : '❌'}`)
  
  if (!schemaResult.success) {
    console.log(`Schema Error: ${schemaResult.error.issues[0]?.message}`)
    failCount++
  }
  
  if (isValidResult !== schemaResult.success) {
    console.log(`⚠️  MISMATCH: Manual validation differs from schema validation`)
    failCount++
  }
})

console.log(`\n${'='.repeat(60)}`)
console.log(`Summary: ${failCount > 0 ? `❌ ${failCount} failures` : '✅ All tests passed'}`)

// Test specific edge cases that might fail
console.log('\n🔍 Testing Edge Cases')
console.log('=' .repeat(30))

const edgeCases = [
  { input: '' },
  { input: 'a' },
  { input: 'ab' },
  { input: '---' },
  { input: '   ' },
]

edgeCases.forEach(({ input }) => {
  const result = generateSlug(input)
  const schemaValid = PublicationSettingsSchema.shape.slug.safeParse(result)
  
  console.log(`Input: "${input}" → "${result}" | Schema: ${schemaValid.success ? '✅' : '❌'}`)
  if (!schemaValid.success) {
    console.log(`  Error: ${schemaValid.error.issues[0]?.message}`)
  }
})
