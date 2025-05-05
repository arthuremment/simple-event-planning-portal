import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (email, role) => {
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          role,
        };
        set({ 
            currentUser: user,
            isAuthenticated: true,
          isAdmin: role === 'admin',
         });
      },

      logout: () => set({ 
        currentUser: null,
        isAuthenticated: false,
          isAdmin: false,
       }),
    }),
    {
      name: 'event-planner-auth', // storage key
      getStorage: () => localStorage,
      partialize: (state) => ({ currentUser: state.currentUser, isAuthenticated: state.isAuthenticated, isAdmin: state.isAdmin }),
    }
  )
);