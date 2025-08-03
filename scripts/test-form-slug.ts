/**
 * Real-world test of generateSlug in form context
 * Location: scripts/test-form-slug.ts
 */
import { generateSlug } from '../src/lib/utils/slug'
import { PublicationSettingsSchema } from '../src/app/events/models/interfaces/eventForm'

// Test the actual use case from the form
const testFormScenario = (eventName: string) => {
  console.log(`\n📝 Testing Form Scenario`)
  console.log(`Event Name: "${eventName}"`)
  
  // This is exactly what happens in PublicationSettingsForm.tsx
  const slug = generateSlug(eventName)
  console.log(`Generated Slug: "${slug}"`)
  
  // Test with the full schema object, not just the slug field
  const testData = {
    slug: slug,
    isPublished: false,
    publishDate: undefined,
    termsAccepted: true
  }
  
  const result = PublicationSettingsSchema.safeParse(testData)
  console.log(`Full Schema Valid: ${result.success ? '✅' : '❌'}`)
  
  if (!result.success) {
    console.log('Schema Errors:')
    result.error.issues.forEach(issue => {
      console.log(`  - ${issue.path.join('.')}: ${issue.message}`)
    })
  }
  
  // Test just the slug field
  const slugResult = PublicationSettingsSchema.shape.slug.safeParse(slug)
  console.log(`Slug Field Valid: ${slugResult.success ? '✅' : '❌'}`)
  
  if (!slugResult.success) {
    console.log('Slug Errors:')
    slugResult.error.issues.forEach(issue => {
      console.log(`  - ${issue.message}`)
    })
  }
  
  return result.success
}

// Test with various real-world event names
const realWorldTests = [
  "My Event",
  "Event with Special Characters!@#",
  "Très Long Event Name with Many Words and Characters",
  "Short",
  "Event-with-existing-hyphens",
  "   Spaces Everywhere   ",
  "123 Numeric Event 456",
  "", // Empty case
  "x", // Single character
]

console.log('🌍 Real-world Form Testing')
console.log('=' .repeat(50))

let failures = 0
realWorldTests.forEach((eventName) => {
  const success = testFormScenario(eventName)
  if (!success) failures++
})

console.log(`\n${'='.repeat(50)}`)
console.log(`Final Result: ${failures === 0 ? '✅ All scenarios passed' : `❌ ${failures} failures`}`)
