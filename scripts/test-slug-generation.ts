/**
 * Slug Generation Test Script
 * Location: scripts/test-slug-generation.ts
 */
import { generateSlug, isValidSlug } from '../src/lib/utils/slug'

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

console.log('🧪 Testing Slug Generation Utility')
console.log('=' .repeat(50))

testCases.forEach((testCase, index) => {
  const slug = generateSlug(testCase)
  const isValid = isValidSlug(slug)
  
  console.log(`\nTest ${index + 1}:`)
  console.log(`Input:  "${testCase}"`)
  console.log(`Output: "${slug}"`)
  console.log(`Valid:  ${isValid ? '✅' : '❌'}`)
  console.log(`Length: ${slug.length} chars`)
  
  if (!isValid) {
    console.log('❌ VALIDATION FAILED!')
  }
})

// Test the regex pattern directly
const schemaPattern = /^[a-z0-9-]+$/
console.log('\n🔍 Schema Compliance Check')
console.log('=' .repeat(50))

testCases.forEach((testCase, index) => {
  const slug = generateSlug(testCase)
  const matchesPattern = schemaPattern.test(slug)
  const correctLength = slug.length >= 3 && slug.length <= 100
  
  if (!matchesPattern || !correctLength) {
    console.log(`\n❌ FAIL - Test ${index + 1}: "${testCase}"`)
    console.log(`   Generated: "${slug}"`)
    console.log(`   Pattern:   ${matchesPattern ? '✅' : '❌'}`)
    console.log(`   Length:    ${correctLength ? '✅' : '❌'} (${slug.length})`)
  }
})

console.log('\n✅ All tests completed!')
