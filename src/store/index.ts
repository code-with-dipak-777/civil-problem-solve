import { create } from 'zustand';
import { User, Notification, IssueCategory, IssueStatus, DistrictStats, Issue } from '@/types';

interface DashboardState {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  currentUser: User | null;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  reportFilters: {
    status: string;
    category: string;
  };
  setReportFilters: (filters: { status: string; category: string }) => void;
  notifications: Notification[];
  issues: Issue[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;

  fetchIssues: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  currentUser: null,
  selectedDistrict: 'All Districts',
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),
  reportFilters: {
    status: 'All',
    category: 'All',
  },
  setReportFilters: (filters) => set({ reportFilters: filters }),
  notifications: [],
  issues: [],
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

  fetchIssues: async () => {
    try {
      const backendUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? `http://${window.location.hostname}:5000`
        : 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/issues`);
      const data = await res.json();
      set({ issues: Array.isArray(data) ? data : data.data || [] });
    } catch (err) {
      console.error(err);
      set({ issues: [] });
    }
  },
  fetchNotifications: async () => {
    try {
      const backendUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? `http://${window.location.hostname}:5000`
        : 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/notifications`);
      const data = await res.json();
      set({ notifications: Array.isArray(data) ? data : data.data || [] });
    } catch (err) {
      console.error(err);
      set({ notifications: [] });
    }
  },
  fetchUser: async () => {
    try {
      const backendUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? `http://${window.location.hostname}:5000`
        : 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/auth/me`);
      if (res.ok) {
        const data = await res.json();
        set({ currentUser: data.user || data });
      }
    } catch (err) {
      console.error(err);
    }
  }
}));
