/**
 * Ticket Configuration Form -import { 
  TicketConfigurationSchema, 
  TicketConfigurationFormData,
  TicketTypeFormData,
  EventFormStep 
} from '../../models/interfaces/eventForm' 2 of Create Event Modal
 * Location: app/events/view/presentation/TicketConfigurationForm.tsx
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Trash2,
  Ticket,
  DollarSign,
  Users,
  AlertCircle,
  Info
} from 'lucide-react'
import { useEventFormStore } from '../../stores/eventFormStore'
import {
  TicketConfigurationSchema,
  TicketConfigurationFormData,
  TicketTypeFormData,
  EventFormStep
} from '../../models/interfaces/eventForm'
import { formatIDR } from '@/lib/utils/currency'

export function TicketConfigurationForm() {
  const {
    ticketConfiguration,
    updateTicketConfiguration,
    addTicketType,
    removeTicketType,
    setStepValid,
    clearErrors
  } = useEventFormStore()

  const form = useForm<TicketConfigurationFormData>({
    resolver: zodResolver(TicketConfigurationSchema),
    defaultValues: ticketConfiguration,
    mode: 'onChange'
  })

  const { formState: { isValid }, setValue, control } = form

  // Watch form changes and update store - use subscription to avoid infinite loops
  useEffect(() => {
    const subscription = form.watch((formValues) => {
      updateTicketConfiguration(formValues as TicketConfigurationFormData)
    })
    return () => subscription.unsubscribe()
  }, [form, updateTicketConfiguration])

  // Update step validity when form validation changes
  useEffect(() => {
    setStepValid(EventFormStep.TICKETS, isValid)
  }, [isValid, setStepValid])

  // Watch form values for display purposes
  const watchedTicketTypes = form.watch('ticketTypes')

  // Clear errors when component mounts
  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  // Handle adding new ticket type
  const handleAddTicketType = () => {
    addTicketType()
    const newIndex = watchedTicketTypes.length
    setValue(`ticketTypes.${newIndex}`, {
      name: `Ticket Type ${newIndex + 1}`,
      description: '',
      price: 0,
      quantity: 100
    })
  }

  // Handle removing ticket type
  const handleRemoveTicketType = (index: number) => {
    if (watchedTicketTypes.length > 1) {
      removeTicketType(index)
      const updatedTicketTypes = watchedTicketTypes.filter((_: TicketTypeFormData, i: number) => i !== index)
      setValue('ticketTypes', updatedTicketTypes)
    }
  }

  // Calculate totals
  const totalTickets = watchedTicketTypes.reduce((sum: number, ticket: TicketTypeFormData) => sum + (ticket.quantity || 0), 0)
  const projectedRevenue = watchedTicketTypes.reduce(
    (sum: number, ticket: TicketTypeFormData) => sum + ((ticket.price || 0) * (ticket.quantity || 0)),
    0
  )
  const platformFee = projectedRevenue * 0.025 // 2.5% platform fee
  const netRevenue = projectedRevenue - platformFee

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Set up your tickets</h2>
        <p className="text-sm text-muted-foreground">
          Create different ticket types with their own pricing and quantities.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          {/* Ticket Types */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                <h3 className="font-medium">Ticket Types</h3>
                <Badge variant="secondary">{watchedTicketTypes.length}</Badge>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTicketType}
                disabled={watchedTicketTypes.length >= 10}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Ticket Type
              </Button>
            </div>

            {watchedTicketTypes.map((ticket: TicketTypeFormData, index: number) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Ticket Type {index + 1}
                    </CardTitle>
                    {watchedTicketTypes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTicketType(index)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {/* Ticket Name */}
                    <FormField
                      control={control}
                      name={`ticketTypes.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='mb-0.5'>Ticket Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. General Admission, VIP, Early Bird"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price */}
                    <FormField
                      control={control}
                      name={`ticketTypes.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Price (IDR) *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="1000"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value ? formatIDR(field.value) : 'Free ticket'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {/* Quantity */}
                    <FormField
                      control={control}
                      name={`ticketTypes.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Available Quantity *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="10000"
                              placeholder="100"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Revenue for this ticket type */}
                    <div className="flex flex-col justify-end">
                      <FormLabel className="text-sm text-muted-foreground mb-2">
                        Revenue from this type
                      </FormLabel>
                      <div className="h-10 flex items-center px-3 bg-muted/50 rounded-md border">
                        <span className="text-sm font-medium">
                          {formatIDR((ticket.price || 0) * (ticket.quantity || 0))}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <FormField
                    control={control}
                    name={`ticketTypes.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what's included with this ticket type..."
                            className="min-h-[80px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-5 w-5" />
                Event Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Tickets</span>
                  <span className="font-medium">{totalTickets.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gross Revenue</span>
                  <span className="font-medium">{formatIDR(projectedRevenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Platform Fee (2.5%)
                    <AlertCircle className="h-3 w-3 inline ml-1" />
                  </span>
                  <span className="text-red-600">-{formatIDR(platformFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Your Net Revenue</span>
                  <span className="font-bold text-green-600">{formatIDR(netRevenue)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <Info className="h-3 w-3 inline mr-1" />
                  Platform fee covers payment processing, security, customer support, and hosting.
                  No setup fees or monthly charges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  )
}
