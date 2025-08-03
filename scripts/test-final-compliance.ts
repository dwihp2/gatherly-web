/**
 * Comprehensive slug generation compliance test
 * Location: scripts/test-final-compliance.ts
 */
import { generateSlug, isValidSlug } from '../src/lib/utils/slug'
import { PublicationSettingsSchema } from '../src/app/events/models/interfaces/eventForm'

console.log('🎯 Final Comprehensive Slug Compliance Test')
console.log('=' .repeat(50))

// Real-world problematic test cases
const realWorldCases = [
  "Dwi's Tech Meetup Jakarta 2025",
  "John's Birthday Party",
  "Mom & Dad's Anniversary", 
  "Rock 'n' Roll Festival",
  "Coffee & Code Session",
  "100% Pure Music Event",
  "Email: support@company.com Workshop",
  "Café de l'Art Exhibition",
  "React.js & Node.js Conference",
  "AI/ML Workshop 2025",
  "@StartupJakarta Meetup",
  "#TechTalk Session",
  "Event (Special Edition)",
  "Music: Jazz & Blues Night",
  "Workshop - Frontend Development",
  "Très important événement",
  "Event with 'quotes' and \"double quotes\"",
  "Mixed: 123@#$%^&*()_+ Event Name!",
]

console.log(`Testing ${realWorldCases.length} real-world cases...\n`)

let passCount = 0
let failCount = 0

realWorldCases.forEach((input, index) => {
  const slug = generateSlug(input)
  const manualValid = isValidSlug(slug) 
  const schemaResult = PublicationSettingsSchema.shape.slug.safeParse(slug)
  const regexValid = /^[a-z0-9-]+$/.test(slug)
  const lengthValid = slug.length >= 3 && slug.length <= 100
  
  const allValid = manualValid && schemaResult.success && regexValid && lengthValid
  
  if (allValid) {
    passCount++
    console.log(`✅ ${index + 1}: "${input}" → "${slug}"`)
  } else {
    failCount++
    console.log(`❌ ${index + 1}: "${input}" → "${slug}"`)
    console.log(`   Manual: ${manualValid ? '✅' : '❌'} | Schema: ${schemaResult.success ? '✅' : '❌'} | Regex: ${regexValid ? '✅' : '❌'} | Length: ${lengthValid ? '✅' : '❌'}`)
    
    if (!schemaResult.success) {
      schemaResult.error.issues.forEach(issue => {
        console.log(`   Schema Error: ${issue.message}`)
      })
    }
  }
})

console.log(`\n${'='.repeat(50)}`)
console.log(`📊 Results: ${passCount} passed, ${failCount} failed`)
console.log(`Success Rate: ${((passCount / realWorldCases.length) * 100).toFixed(1)}%`)

if (failCount === 0) {
  console.log(`\n🎉 ALL TESTS PASSED! The generateSlug function is fully compliant with PublicationSettingsSchema.`)
} else {
  console.log(`\n⚠️  ${failCount} tests failed. The generateSlug function needs further fixes.`)
}

// Test the specific user case
console.log(`\n🎯 User's Specific Case:`)
const userInput = "Dwi's Tech Meetup Jakarta 2025"
const userSlug = generateSlug(userInput)
const userValid = PublicationSettingsSchema.shape.slug.safeParse(userSlug).success

console.log(`Input: "${userInput}"`)
console.log(`Output: "${userSlug}"`)
console.log(`Valid: ${userValid ? '✅ PASS' : '❌ FAIL'}`)
console.log(`Length: ${userSlug.length} characters`)
console.log(`Regex: ${/^[a-z0-9-]+$/.test(userSlug) ? '✅' : '❌'}`)

if (userValid) {
  console.log(`\n✨ The user's specific case is now working correctly!`)
}
