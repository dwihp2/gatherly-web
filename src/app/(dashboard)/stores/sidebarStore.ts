/**
 * Sidebar Store
 * Location: app/(dashboard)/stores/sidebarStore.ts
 * 
 * Manages sidebar state for dashboard navigation
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  // Desktop sidebar collapse state
  isCollapsed: boolean
  // Mobile sidebar open state
  isMobileOpen: boolean
  // Active submenu states
  expandedMenus: Record<string, boolean>

  // Actions
  toggleCollapsed: () => void
  setCollapsed: (collapsed: boolean) => void
  toggleMobile: () => void
  setMobileOpen: (open: boolean) => void
  toggleSubmenu: (menuId: string) => void
  setSubmenuExpanded: (menuId: string, expanded: boolean) => void
  collapseAllSubmenus: () => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // Initial state
      isCollapsed: false,
      isMobileOpen: false,
      expandedMenus: {},

      // Desktop sidebar actions
      toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),

      // Mobile sidebar actions
      toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      setMobileOpen: (open) => set({ isMobileOpen: open }),

      // Submenu actions
      toggleSubmenu: (menuId) => set((state) => ({
        expandedMenus: {
          ...state.expandedMenus,
          [menuId]: !state.expandedMenus[menuId]
        }
      })),
      setSubmenuExpanded: (menuId, expanded) => set((state) => ({
        expandedMenus: {
          ...state.expandedMenus,
          [menuId]: expanded
        }
      })),
      collapseAllSubmenus: () => set({ expandedMenus: {} }),
    }),
    {
      name: 'gatherly-sidebar-state',
      // Only persist desktop collapse state, not mobile or submenu states
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
    }
  )
)
