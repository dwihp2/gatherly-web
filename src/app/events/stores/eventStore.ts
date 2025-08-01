/**
 * Event management store using Zustand
 * Location: app/events/stores/eventStore.ts
 */
import { create } from 'zustand';
import type { Event } from '../models/interfaces/event';

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}

interface EventActions {
  setEvents: (events: Event[]) => void;
  setCurrentEvent: (event: Event | null) => void;
  addEvent: (event: Event) => void;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  deleteEvent: (eventId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

interface EventStore extends EventState, EventActions {}

export const useEventStore = create<EventStore>()((set) => ({
  // Initial state
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,

  // Actions
  setEvents: (events: Event[]) => {
    set({ events, error: null });
  },

  setCurrentEvent: (event: Event | null) => {
    set({ currentEvent: event });
  },

  addEvent: (event: Event) => {
    set(state => ({
      events: [event, ...state.events],
      error: null,
    }));
  },

  updateEvent: (eventId: string, updates: Partial<Event>) => {
    set(state => ({
      events: state.events.map(event =>
        event.id === eventId ? { ...event, ...updates } : event
      ),
      currentEvent: state.currentEvent?.id === eventId
        ? { ...state.currentEvent, ...updates }
        : state.currentEvent,
      error: null,
    }));
  },

  deleteEvent: (eventId: string) => {
    set(state => ({
      events: state.events.filter(event => event.id !== eventId),
      currentEvent: state.currentEvent?.id === eventId ? null : state.currentEvent,
      error: null,
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
