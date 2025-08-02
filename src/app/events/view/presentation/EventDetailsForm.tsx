/**
 * Event Details Form - Step 1 of Create Event Modal
 * Location: app/events/view/present          <FormField
            control={form.control}
            name="dateTime"
            render={() => (n/EventDetailsForm.tsx
 */
'use client'

import { useEffect } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Upload, MapPin, Clock, FileText, Image as ImageIcon } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useEventFormStore } from '../../stores/eventFormStore'
import {
  EventDetailsSchema,
  EventDetailsFormData,
  EventFormStep
} from '../../models/interfaces/eventForm'

export function EventDetailsForm() {
  const {
    eventDetails,
    updateEventDetails,
    setStepValid,
    clearErrors
  } = useEventFormStore()

  const form = useForm<EventDetailsFormData>({
    resolver: zodResolver(EventDetailsSchema),
    defaultValues: eventDetails,
    mode: 'onChange'
  })

  const { formState: { isValid } } = form

  // Watch form changes and update store - use subscription to avoid infinite loops
  useEffect(() => {
    const subscription = form.watch((formValues) => {
      updateEventDetails(formValues as EventDetailsFormData)
    })
    return () => subscription.unsubscribe()
  }, [form, updateEventDetails])

  // Update step validity when form validation changes
  useEffect(() => {
    setStepValid(EventFormStep.DETAILS, isValid)
  }, [isValid, setStepValid])

  // Clear errors when component mounts
  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  // Handle date/time selection
  const handleDateTimeChange = (date: Date | undefined, timeString: string) => {
    if (date) {
      const [hours, minutes] = timeString.split(':').map(Number)
      const dateTime = new Date(date)
      dateTime.setHours(hours, minutes, 0, 0)

      form.setValue('dateTime', dateTime.toISOString())
    }
  }

  // Parse current dateTime for display
  const watchedDateTime = form.watch('dateTime')
  const currentDateTime = watchedDateTime ? new Date(watchedDateTime) : undefined
  const currentDate = currentDateTime
  const currentTime = currentDateTime
    ? format(currentDateTime, 'HH:mm')
    : '19:00'

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Tell us about your event</h2>
        <p className="text-sm text-muted-foreground">
          Provide the basic information that attendees will see about your event.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          {/* Event Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Event Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Jakarta Music Festival 2024"
                    {...field}
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription>
                  Choose a clear, descriptive name that tells people what your event is about.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your event, what attendees can expect, special guests, activities, etc."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Help people understand what makes your event special. You can always edit this later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dateTime"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Event Date *
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !currentDate && "text-muted-foreground"
                          )}
                        >
                          {currentDate ? (
                            format(currentDate, "PPP", { locale: id })
                          ) : (
                            "Pilih tanggal"
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={(date) => handleDateTimeChange(date, currentTime)}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Event Time *
              </FormLabel>
              <FormControl>
                <Input
                  type="time"
                  value={currentTime}
                  onChange={(e) => handleDateTimeChange(currentDate, e.target.value)}
                />
              </FormControl>
            </FormItem>
          </div>

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Event Location *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Jakarta Convention Center, Central Jakarta"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include the venue name and area to help attendees find your event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event Poster */}
          <FormField
            control={form.control}
            name="posterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Event Poster (Optional)
                </FormLabel>
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-8 px-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Upload an eye-catching poster for your event
                    </p>
                    <div className="space-y-2 w-full max-w-sm">
                      <FormControl>
                        <Input
                          placeholder="Or paste image URL here"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        disabled
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File (Coming Soon)
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: 800x600px, JPG or PNG
                    </p>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  )
}
