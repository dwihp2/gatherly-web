/**
 * Event Form Store - Multi-step Create/Edit Event Form State Management
 * Location: app/events/stores/eventFormStore.ts
 */
import { create } from 'zustand'
import {
  EventFormStep,
  EventFormState,
  CreateEventFormData,
  EventDetailsFormData,
  TicketConfigurationFormData,
  PublicationSettingsFormData,
  defaultEventDetailsValues,
  defaultPublicationValues,
  TicketTypeFormData,
  defaultTicketTypeValues
} from '../models/interfaces/eventForm'

interface EventFormStore extends EventFormState {
  // Form data
  eventDetails: EventDetailsFormData
  ticketConfiguration: TicketConfigurationFormData
  publicationSettings: PublicationSettingsFormData

  // Modal state
  isModalOpen: boolean
  isEditMode: boolean
  editingEventId: string | null

  // Actions
  openCreateModal: () => void
  openEditModal: (eventId: string) => void
  closeModal: () => void

  // Step navigation
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: EventFormStep) => void

  // Form data updates
  updateEventDetails: (data: Partial<EventDetailsFormData>) => void
  updateTicketConfiguration: (data: TicketConfigurationFormData) => void
  updatePublicationSettings: (data: Partial<PublicationSettingsFormData>) => void

  // Ticket management
  addTicketType: () => void
  removeTicketType: (index: number) => void
  updateTicketType: (index: number, data: Partial<TicketTypeFormData>) => void

  // Form state management
  setStepValid: (step: EventFormStep, isValid: boolean) => void
  setLoading: (loading: boolean) => void
  setErrors: (errors: Record<string, string[]>) => void
  clearErrors: () => void

  // Utility
  canProceedToNextStep: () => boolean
  canGoToPreviousStep: () => boolean
  getFormData: () => CreateEventFormData
  resetForm: () => void
}

export const useEventFormStore = create<EventFormStore>()((set, get) => ({
  // Initial state
  currentStep: EventFormStep.DETAILS,
  isLoading: false,
  isValid: {
    [EventFormStep.DETAILS]: false,
    [EventFormStep.TICKETS]: false,
    [EventFormStep.PUBLICATION]: false
  },
  errors: {},

  // Form data
  eventDetails: defaultEventDetailsValues,
  ticketConfiguration: {
    ticketTypes: [defaultTicketTypeValues]
  },
  publicationSettings: defaultPublicationValues,

  // Modal state
  isModalOpen: false,
  isEditMode: false,
  editingEventId: null,

  // Actions
  openCreateModal: () => {
    set({
      isModalOpen: true,
      isEditMode: false,
      editingEventId: null,
      currentStep: EventFormStep.DETAILS
    })
  },

  openEditModal: (eventId: string) => {
    set({
      isModalOpen: true,
      isEditMode: true,
      editingEventId: eventId,
      currentStep: EventFormStep.DETAILS
    })
    // TODO: Load existing event data
  },

  closeModal: () => {
    set({
      isModalOpen: false,
      isEditMode: false,
      editingEventId: null
    })
    // Reset form data after a brief delay to prevent race conditions
    setTimeout(() => {
      get().resetForm()
    }, 100)
  },

  // Step navigation
  nextStep: () => {
    const { currentStep, canProceedToNextStep } = get()
    if (canProceedToNextStep() && currentStep < EventFormStep.PUBLICATION) {
      set({ currentStep: (currentStep + 1) as EventFormStep })
    }
  },

  previousStep: () => {
    const { currentStep, canGoToPreviousStep } = get()
    if (canGoToPreviousStep() && currentStep > EventFormStep.DETAILS) {
      set({ currentStep: (currentStep - 1) as EventFormStep })
    }
  },

  goToStep: (step: EventFormStep) => {
    set({ currentStep: step })
  },

  // Form data updates
  updateEventDetails: (data: Partial<EventDetailsFormData>) => {
    set(state => ({
      eventDetails: { ...state.eventDetails, ...data }
    }))
  },

  updateTicketConfiguration: (data: TicketConfigurationFormData) => {
    set({ ticketConfiguration: data })
  },

  updatePublicationSettings: (data: Partial<PublicationSettingsFormData>) => {
    set(state => ({
      publicationSettings: { ...state.publicationSettings, ...data }
    }))
  },

  // Ticket management
  addTicketType: () => {
    set(state => ({
      ticketConfiguration: {
        ticketTypes: [...state.ticketConfiguration.ticketTypes, { ...defaultTicketTypeValues }]
      }
    }))
  },

  removeTicketType: (index: number) => {
    set(state => ({
      ticketConfiguration: {
        ticketTypes: state.ticketConfiguration.ticketTypes.filter((_, i) => i !== index)
      }
    }))
  },

  updateTicketType: (index: number, data: Partial<TicketTypeFormData>) => {
    set(state => ({
      ticketConfiguration: {
        ticketTypes: state.ticketConfiguration.ticketTypes.map((ticket, i) =>
          i === index ? { ...ticket, ...data } : ticket
        )
      }
    }))
  },

  // Form state management
  setStepValid: (step: EventFormStep, isValid: boolean) => {
    set(state => ({
      isValid: { ...state.isValid, [step]: isValid }
    }))
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  setErrors: (errors: Record<string, string[]>) => {
    set({ errors })
  },

  clearErrors: () => {
    set({ errors: {} })
  },

  // Utility functions
  canProceedToNextStep: () => {
    const { currentStep, isValid } = get()
    return isValid[currentStep] && !get().isLoading
  },

  canGoToPreviousStep: () => {
    const { currentStep } = get()
    return currentStep > EventFormStep.DETAILS && !get().isLoading
  },

  getFormData: (): CreateEventFormData => {
    const { eventDetails, ticketConfiguration, publicationSettings } = get()
    return {
      ...eventDetails,
      ...ticketConfiguration,
      ...publicationSettings,
      organizationId: '' // Will be set from auth context
    }
  },

  resetForm: () => {
    set({
      currentStep: EventFormStep.DETAILS,
      isLoading: false,
      isValid: {
        [EventFormStep.DETAILS]: false,
        [EventFormStep.TICKETS]: false,
        [EventFormStep.PUBLICATION]: false
      },
      errors: {},
      eventDetails: defaultEventDetailsValues,
      ticketConfiguration: {
        ticketTypes: [defaultTicketTypeValues]
      },
      publicationSettings: defaultPublicationValues,
      isEditMode: false,
      editingEventId: null
    })
  }
}))
