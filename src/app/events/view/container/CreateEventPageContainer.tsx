/**
 * Create Event Page Container - Full page event creation
 * Location: app/events/view/container/CreateEventPageContainer.tsx
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Save, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEventFormStore } from '../../stores/eventFormStore'
import { EventDetailsForm } from '../presentation/EventDetailsForm'
import { TicketConfigurationForm } from '../presentation/TicketConfigurationForm'
import { PublicationSettingsForm } from '../presentation/PublicationSettingsForm'
import { EventFormStep } from '../../models/interfaces/eventForm'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import { cn } from '@/lib/utils'

const STEP_TITLES = {
  [EventFormStep.DETAILS]: 'Event Details',
  [EventFormStep.TICKETS]: 'Ticket Configuration',
  [EventFormStep.PUBLICATION]: 'Publication Settings'
}

const STEP_DESCRIPTIONS = {
  [EventFormStep.DETAILS]: 'Basic information about your event',
  [EventFormStep.TICKETS]: 'Set up ticket types and pricing',
  [EventFormStep.PUBLICATION]: 'Choose how to publish your event'
}

export function CreateEventPageContainer() {
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
    setLoading
  } = useEventFormStore()

  // Initialize form state
  useEffect(() => {
    resetForm()
  }, [resetForm])

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

  // Calculate progress percentage
  const progressPercentage = (currentStep / 3) * 100

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
      <div className="container max-w-4xl mx-auto py-8">
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
            <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
            <p className="text-muted-foreground">
              {STEP_DESCRIPTIONS[currentStep]}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              {Object.entries(STEP_TITLES).map(([step, title]) => {
                const stepNumber = parseInt(step) as EventFormStep
                const isActive = stepNumber === currentStep
                const isCompleted = stepNumber < currentStep

                return (
                  <div
                    key={step}
                    className={cn(
                      "flex items-center gap-3 text-sm",
                      isActive && "text-primary font-medium",
                      isCompleted && "text-muted-foreground",
                      !isActive && !isCompleted && "text-muted-foreground/60"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        isActive && "bg-primary text-primary-foreground",
                        isCompleted && "bg-primary/20 text-primary",
                        !isActive && !isCompleted && "bg-muted text-muted-foreground"
                      )}
                    >
                      {stepNumber}
                    </div>
                    <span>{title}</span>
                  </div>
                )
              })}
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{STEP_TITLES[currentStep]}</CardTitle>
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
