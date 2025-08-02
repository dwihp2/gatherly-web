/**
 * Create Event Modal - Main Modal Component
 * Location: app/events/view/presentation/CreateEventModal.tsx
 */
'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { X, ArrowLeft, ArrowRight, Save, Send, Expand } from 'lucide-react'
import { useEventFormStore } from '../../stores/eventFormStore'
import { EventFormStep } from '../../models/interfaces/eventForm'
import { cn } from '@/lib/utils'

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  isEditMode: boolean
  currentStep: EventFormStep
  isLoading: boolean
  onSubmit: () => void
  onExpand?: () => void
  children: React.ReactNode
}

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

export function CreateEventModal({
  isOpen,
  onClose,
  isEditMode,
  currentStep,
  isLoading,
  onSubmit,
  onExpand,
  children
}: CreateEventModalProps) {
  const {
    nextStep,
    previousStep,
    canProceedToNextStep,
    canGoToPreviousStep,
    publicationSettings
  } = useEventFormStore()

  // Calculate progress percentage
  const progressPercentage = (currentStep / 3) * 100

  // Handle next step
  const handleNext = () => {
    if (currentStep === EventFormStep.PUBLICATION) {
      // Final submission
      onSubmit()
    } else {
      nextStep()
    }
  }

  // Handle save as draft (only available on publication step)
  const handleSaveDraft = () => {
    const store = useEventFormStore.getState()
    store.updatePublicationSettings({ isPublished: false })
    onSubmit()
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

  const NextIcon = getNextButtonIcon()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl h-[90vh] p-0 overflow-hidden gap-0"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold">
                {isEditMode ? 'Edit Event' : 'Create New Event'}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {STEP_DESCRIPTIONS[currentStep]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onExpand && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExpand}
                  disabled={isLoading}
                  className="h-8 w-8 p-0"
                  title="Open in full page"
                >
                  <Expand className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                disabled={isLoading}
                className="h-8 w-8 p-0"
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {Object.entries(STEP_TITLES).map(([step, title]) => {
                const stepNumber = parseInt(step) as EventFormStep
                const isActive = stepNumber === currentStep
                const isCompleted = stepNumber < currentStep

                return (
                  <div
                    key={step}
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      isActive && "text-primary font-medium",
                      isCompleted && "text-muted-foreground",
                      !isActive && !isCompleted && "text-muted-foreground/60"
                    )}
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                        isActive && "bg-primary text-primary-foreground",
                        isCompleted && "bg-primary/20 text-primary",
                        !isActive && !isCompleted && "bg-muted text-muted-foreground"
                      )}
                    >
                      {stepNumber}
                    </div>
                    <span className="hidden sm:inline">{title}</span>
                  </div>
                )
              })}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            <div className="max-w-2xl mx-auto">
              {children}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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

            <div className="flex items-center gap-2">
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
                className="flex items-center gap-2 min-w-[120px]"
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
      </DialogContent>
    </Dialog>
  )
}
