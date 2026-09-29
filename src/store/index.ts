import { create } from 'zustand';
import { User, Notification, IssueCategory, IssueStatus, DistrictStats } from '@/types';
import { mockUser, mockNotifications } from '@/data/mock-data';

interface DashboardState {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  currentUser: User;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  reportFilters: {
    status: string;
    category: string;
  };
  setReportFilters: (filters: { status: string; category: string }) => void;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  currentUser: mockUser,
  selectedDistrict: 'All Districts',
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),
  reportFilters: {
    status: 'All',
    category: 'All',
  },
  setReportFilters: (filters) => set({ reportFilters: filters }),
  notifications: mockNotifications,
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
