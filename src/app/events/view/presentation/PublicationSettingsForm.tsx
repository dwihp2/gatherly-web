/**
 * Publication Settings Form - Step 3 of Create Event Modal
 * Location: app/events/view/presentation/PublicationSettingsForm.tsx
 */
'use client'

import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { generateSlug } from '@/lib/utils/slug'
import {
  Globe,
  Link as LinkIcon,
  Copy,
  Check,
  Calendar as CalendarIcon,
  Clock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useEventFormStore } from '../../stores/eventFormStore'
import {
  PublicationSettingsSchema,
  PublicationSettingsFormData,
  EventFormStep
} from '../../models/interfaces/eventForm'

export function PublicationSettingsForm() {
  const {
    publicationSettings,
    updatePublicationSettings,
    eventDetails,
    setStepValid,
    clearErrors
  } = useEventFormStore()

  const [isCheckingSlug, setIsCheckingSlug] = useState(false)
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const isUpdatingFromStore = useRef(false)

  const form = useForm<PublicationSettingsFormData>({
    resolver: zodResolver(PublicationSettingsSchema),
    defaultValues: publicationSettings,
    mode: 'onChange'
  })

  const { formState: { isValid }, setValue } = form

  // Sync form with store data when editing (prevent circular updates)
  useEffect(() => {
    isUpdatingFromStore.current = true
    form.reset(publicationSettings)
    setTimeout(() => {
      form.trigger() // Trigger validation for all fields
      isUpdatingFromStore.current = false
    }, 0)
  }, [publicationSettings, form])

  // Watch form changes and update store - use subscription to avoid infinite loops
  useEffect(() => {
    const subscription = form.watch((formValues) => {
      // Only update store if we're not currently syncing from store
      if (!isUpdatingFromStore.current) {
        updatePublicationSettings(formValues as PublicationSettingsFormData)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, updatePublicationSettings])

  // Update step validity when form validation changes
  useEffect(() => {
    setStepValid(EventFormStep.PUBLICATION, isValid)
  }, [isValid, setStepValid])

  // Watch specific fields for display
  const watchedSlug = form.watch('slug')
  const watchedIsPublished = form.watch('isPublished')
  const watchedPublishDate = form.watch('publishDate')

  // Clear errors when component mounts
  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  // Generate initial slug from event name
  useEffect(() => {
    if (!watchedSlug && eventDetails.name) {
      const slug = generateSlug(eventDetails.name)

      if (slug) {
        setValue('slug', slug)
      }
    }
  }, [eventDetails.name, watchedSlug, setValue])

  // Check slug availability (simulated)
  const checkSlugAvailability = async (slug: string) => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null)
      return
    }

    setIsCheckingSlug(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate random availability (in real app, this would be an API call)
    const available = Math.random() > 0.3
    setSlugAvailable(available)
    setIsCheckingSlug(false)
  }

  // Debounced slug checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkSlugAvailability(watchedSlug)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [watchedSlug])

  // Generate event URL
  const eventUrl = `https://gatherly.id/events/${watchedSlug}`

  // Handle copy URL
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  // Handle publish date selection
  const handlePublishDateChange = (date: Date | undefined) => {
    if (date) {
      setValue('publishDate', date.toISOString())
    } else {
      setValue('publishDate', undefined)
    }
  }

  const publishDate = watchedPublishDate ? new Date(watchedPublishDate) : undefined

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Ready to publish?</h2>
        <p className="text-sm text-muted-foreground">
          Set up your event URL and choose when to make it live.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          {/* Event URL */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Event URL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>URL Slug</FormLabel>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center border rounded-md">
                          <span className="px-3 py-2 bg-muted text-muted-foreground text-sm border-r">
                            gatherly.id/events/
                          </span>
                          <FormControl>
                            <Input
                              placeholder="your-event-name"
                              className="border-0 rounded-l-none focus-visible:ring-0"
                              {...field}
                            />
                          </FormControl>
                          <div className="px-3 py-2 border-l">
                            {isCheckingSlug ? (
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            ) : slugAvailable === true ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : slugAvailable === false ? (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <FormDescription>
                      {isCheckingSlug ? (
                        'Checking availability...'
                      ) : slugAvailable === true ? (
                        <span className="text-green-600">✓ This URL is available</span>
                      ) : slugAvailable === false ? (
                        <span className="text-red-600">✗ This URL is already taken</span>
                      ) : (
                        'This will be your event\'s public URL'
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URL Preview */}
              {watchedSlug && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground truncate">
                        {eventUrl}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyUrl}
                      className="flex items-center gap-1 flex-shrink-0 ml-2"
                    >
                      {copied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Publication Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Visibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center gap-2">
                        {field.value ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        Publish Event
                      </FormLabel>
                      <FormDescription>
                        {field.value ? (
                          'Your event will be publicly visible and bookable'
                        ) : (
                          'Save as draft - only you can see this event'
                        )}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Scheduled Publishing */}
              {watchedIsPublished && (
                <FormField
                  name="publishDate"
                  render={() => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        Publication Date (Optional)
                      </FormLabel>
                      <div className="flex items-center space-x-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !publishDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {publishDate ? (
                                  format(publishDate, "PPP", { locale: id })
                                ) : (
                                  "Publish immediately"
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={publishDate}
                              onSelect={handlePublishDateChange}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                            />
                            <div className="p-3 border-t">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePublishDateChange(undefined)}
                                className="w-full"
                              >
                                Clear Date
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormDescription>
                        {publishDate ? (
                          `Event will be published on ${format(publishDate, "PPP", { locale: id })}`
                        ) : (
                          'Event will be published immediately after creation'
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Terms & Conditions */}
          <Card>
            <CardContent className="pt-6">
              <FormField
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm" required>
                        I agree to the Terms & Conditions
                      </FormLabel>
                      <FormDescription>
                        By creating this event, you agree to our{' '}
                        <Button variant="link" className="p-0 h-auto text-xs">
                          Terms of Service
                        </Button>
                        {' '}and{' '}
                        <Button variant="link" className="p-0 h-auto text-xs">
                          Privacy Policy
                        </Button>
                        . You also confirm that you have the right to sell tickets for this event.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge variant={watchedIsPublished ? "default" : "secondary"} className="px-4 py-2">
              {watchedIsPublished ? (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Will be published
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3 mr-1" />
                  Will be saved as draft
                </>
              )}
            </Badge>
          </div>
        </div>
      </Form>
    </div>
  )
}
