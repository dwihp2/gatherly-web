/**
 * URL Slug Generation Utility
 * Location: src/lib/utils/slug.ts
 * 
 * Generates URL-safe slugs that comply with PublicationSettingsSchema validation:
 * - Only lowercase letters, numbers, and hyphens
 * - Minimum 3 characters, maximum 100 characters
 * - No consecutive hyphens
 * - No leading or trailing hyphens
 */

/**
 * Generates a URL-safe slug from input string
 * @param input - The input string to convert to a slug
 * @returns A valid slug that complies with PublicationSettingsSchema
 */
export function generateSlug(input: string): string {
  if (!input || typeof input !== 'string') {
    return 'event-slug'
  }

  // Convert to lowercase and remove invalid characters
  let slug = input
    .toLowerCase()
    .trim()
    // First normalize unicode characters (like café → cafe)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    // Remove ALL characters that are not lowercase letters, numbers, spaces, or existing hyphens
    .replace(/[^a-z0-9\s-]/g, '')    // This will remove apostrophes, special chars, etc.
    .replace(/\s+/g, '-')            // Replace one or more spaces with single hyphen
    .replace(/-+/g, '-')             // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-+|-+$/g, '')         // Remove leading and trailing hyphens

  // Ensure max length constraint
  if (slug.length > 100) {
    slug = slug.substring(0, 100).replace(/-+$/, '') // Remove trailing hyphen after truncation
  }

  // Ensure minimum length constraint
  if (slug.length < 3) {
    // Try to pad with numbers, or use fallback
    if (slug.length === 0) {
      return 'event-slug'
    } else if (slug.length === 1) {
      slug = slug + '-01'
    } else if (slug.length === 2) {
      slug = slug + '-1'
    }
  }

  // Final validation - if still invalid, return fallback
  const isValid = /^[a-z0-9-]+$/.test(slug) && slug.length >= 3 && slug.length <= 100
  return isValid ? slug : 'event-slug'
}

/**
 * Validates if a slug meets the PublicationSettingsSchema requirements
 * @param slug - The slug to validate
 * @returns True if the slug is valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') {
    return false
  }

  // Check regex pattern and length constraints
  return /^[a-z0-9-]+$/.test(slug) && slug.length >= 3 && slug.length <= 100
}
