/**
 * Create Event Page Container - Full page event creation
 * Location: app/events/view/container/CreateEventPageContainer.tsx
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Save, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { useEventFormStore } from '../../stores/eventFormStore'
import { EventDetailsForm } from '../presentation/EventDetailsForm'
import { TicketConfigurationForm } from '../presentation/TicketConfigurationForm'
import { PublicationSettingsForm } from '../presentation/PublicationSettingsForm'
import { EventFormStep } from '../../models/interfaces/eventForm'
import { useAuth } from '../../../(auth)/hooks/useAuth'

const steps = [
  {
    step: EventFormStep.DETAILS,
    title: "Event Details",
    description: "Basic information about your event",
  },
  {
    step: EventFormStep.TICKETS,
    title: "Ticket Configuration",
    description: "Set up ticket types and pricing",
  },
  {
    step: EventFormStep.PUBLICATION,
    title: "Publication Settings",
    description: "Choose how to publish your event",
  },
]

export function CreateEventPageContainer({ isEditMode = false }: { isEditMode?: boolean }) {
  const router = useRouter()
  const { user } = useAuth()
  const {
    currentStep,
    isLoading,
    nextStep,
    previousStep,
    canProceedToNextStep,
    canGoToPreviousStep,
    publicationSettings,
    resetForm,
    getFormData,
    setLoading,
    isEditMode: storeIsEditMode
  } = useEventFormStore()

  // Initialize form state only for create mode
  useEffect(() => {
    if (!isEditMode && !storeIsEditMode) {
      resetForm()
    }
  }, [resetForm, isEditMode, storeIsEditMode])

  // Handle form submission
  const handleSubmit = async () => {
    if (!user?.tenantId) {
      console.error('No tenant ID found')
      return
    }

    setLoading(true)

    try {
      const formData = getFormData()
      formData.organizationId = user.tenantId

      // TODO: Implement actual event creation via usecase
      console.log('Creating event:', formData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Navigate to dashboard on success
      router.push('/dashboard')

      // TODO: Show success toast

    } catch (error) {
      console.error('Error creating event:', error)
      // TODO: Show error toast
    } finally {
      setLoading(false)
    }
  }

  // Handle next step
  const handleNext = () => {
    if (currentStep === EventFormStep.PUBLICATION) {
      // Final submission
      handleSubmit()
    } else {
      nextStep()
    }
  }

  // Handle save as draft (only available on publication step)
  const handleSaveDraft = () => {
    const store = useEventFormStore.getState()
    store.updatePublicationSettings({ isPublished: false })
    handleSubmit()
  }

  // Get button text based on current step and publication settings
  const getNextButtonText = () => {
    if (currentStep === EventFormStep.PUBLICATION) {
      if (isEditMode || storeIsEditMode) {
        return 'Update Event'
      }
      return publicationSettings.isPublished ? 'Publish Event' : 'Save Draft'
    }
    return 'Continue'
  }

  // Get next button icon
  const getNextButtonIcon = () => {
    if (currentStep === EventFormStep.PUBLICATION) {
      return publicationSettings.isPublished ? Send : Save
    }
    return ArrowRight
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case EventFormStep.DETAILS:
        return <EventDetailsForm />
      case EventFormStep.TICKETS:
        return <TicketConfigurationForm />
      case EventFormStep.PUBLICATION:
        return <PublicationSettingsForm />
      default:
        return <EventDetailsForm />
    }
  }

  const NextIcon = getNextButtonIcon()

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditMode || storeIsEditMode ? 'Edit Event' : 'Create New Event'}
            </h1>
            <p className="text-muted-foreground">
              {steps.find(s => s.step === currentStep)?.description}
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="mt-8">
            <Stepper value={currentStep} className="w-full">
              {steps.map(({ step, title, description }) => (
                <StepperItem
                  key={step}
                  step={step}
                  completed={step < currentStep}
                  className="relative flex-1 flex-col!"
                >
                  <StepperTrigger className="flex-col gap-3 rounded">
                    <StepperIndicator />
                    <div className="space-y-0.5 px-2">
                      <StepperTitle>{title}</StepperTitle>
                      <StepperDescription className="max-sm:hidden">
                        {description}
                      </StepperDescription>
                    </div>
                  </StepperTrigger>
                  {step < steps.length && (
                    <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                  )}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{steps.find(s => s.step === currentStep)?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex items-center justify-between">
          <div>
            {canGoToPreviousStep() && (
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Save as Draft button (only on publication step) */}
            {currentStep === EventFormStep.PUBLICATION && publicationSettings.isPublished && (
              <>
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* Main action button */}
            <Button
              onClick={handleNext}
              disabled={!canProceedToNextStep() || isLoading}
              className="flex items-center gap-2 min-w-[140px]"
              size="lg"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <NextIcon className="h-4 w-4" />
              )}
              {isLoading ? 'Processing...' : getNextButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
