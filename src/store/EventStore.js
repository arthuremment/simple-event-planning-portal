import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { events } from "../data";

export const useEventStore = create()(
  persist(
    (set, get) => ({
      events: events,
      bookings: [],

      addEvent: (eventData) => {
        const newEvent = { id: uuidv4(), ...eventData };
        set((state) => ({ events: [...state.events, newEvent] }));
      },

      updateEvent: (updatedEvent) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === updatedEvent.id ? 
                { ...e, ...updatedEvent } 
                : e
          ),
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
          bookings: state.bookings.filter((b) => b.eventId !== id),
        }));
      },

      getEvent: (id) => get().events.find((e) => e.id === id),

      bookEvent: (bookingData) => {
        const event = get().events.find((e) => e.id === bookingData.eventId);
        if (!event) return false;
        const booked = get()
          .getEventBookings(bookingData.eventId)
          .reduce((sum, b) => sum + b.numberOfAttendees, 0);
        if (booked + bookingData.numberOfAttendees > event.capacity) {
          return false;
        }
        const newBooking = {
          id: uuidv4(),
          bookingDate: new Date().toISOString(),
          ...bookingData,
        };
        set((state) => ({ bookings: [...state.bookings, newBooking] }));
        return true;
      },

      getEventBookings: (eventId) =>
        get().bookings.filter((b) => b.eventId === eventId),

      getAvailableCapacity: (eventId) => {
        const ev = get().events.find((e) => e.id === eventId);
        if (!ev) return 0;
        const used = get()
          .bookings.filter((b) => b.eventId === eventId)
          .reduce((sum, b) => sum + b.numberOfAttendees, 0);
        return ev.capacity - used;
      },
    }),
    {
      name: "event-planner-data",
      getStorage: () => localStorage,
      partialize: (state) => ({
        events: state.events,
        bookings: state.bookings,
      }),
    }
  )
);