import { create } from 'zustand';
import { User, Notification, IssueCategory, IssueStatus, DistrictStats, Issue } from '@/types';

// Helper to get backend URL
const getBackendUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return `http://${window.location.hostname}:5000`;
  }
  return 'http://localhost:5000';
};

// Helper to get auth token from cookie
const getAuthToken = (): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

// Helper to set auth token cookie
const setAuthToken = (token: string) => {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `auth_token=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Lax`;
};

// Helper to remove auth token cookie
const removeAuthToken = () => {
  document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax';
};

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

interface DashboardState {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  currentUser: User | null;
  isAuthLoading: boolean;
  authError: string | null;
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

  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { name: string; email: string; password: string; district: string; city?: string }) => Promise<boolean>;
  logout: () => void;
  clearAuthError: () => void;

  fetchIssues: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  currentUser: null,
  isAuthLoading: false,
  authError: null,
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

  login: async (email: string, password: string) => {
    set({ isAuthLoading: true, authError: null });
    try {
      const res = await fetch(`${getBackendUrl()}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        set({ isAuthLoading: false, authError: data.message || 'Login failed' });
        return false;
      }
      setAuthToken(data.data?.token || data.token);
      set({ currentUser: data.data?.user || data.user, isAuthLoading: false, authError: null });
      return true;
    } catch (err: any) {
      set({ isAuthLoading: false, authError: err.message || 'Network error' });
      return false;
    }
  },

  signup: async (signupData) => {
    set({ isAuthLoading: true, authError: null });
    try {
      const res = await fetch(`${getBackendUrl()}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (!res.ok) {
        set({ isAuthLoading: false, authError: data.message || 'Signup failed' });
        return false;
      }
      setAuthToken(data.data?.token || data.token);
      set({ currentUser: data.data?.user || data.user, isAuthLoading: false, authError: null });
      return true;
    } catch (err: any) {
      set({ isAuthLoading: false, authError: err.message || 'Network error' });
      return false;
    }
  },

  logout: () => {
    removeAuthToken();
    set({ currentUser: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  clearAuthError: () => set({ authError: null }),

  fetchIssues: async () => {
    try {
      const res = await fetch(`${getBackendUrl()}/api/issues`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      set({ issues: Array.isArray(data) ? data : data.data || [] });
    } catch (err) {
      console.error(err);
      set({ issues: [] });
    }
  },
  fetchNotifications: async () => {
    try {
      const res = await fetch(`${getBackendUrl()}/api/notifications`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      set({ notifications: Array.isArray(data) ? data : data.data || [] });
    } catch (err) {
      console.error(err);
      set({ notifications: [] });
    }
  },
  fetchUser: async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await fetch(`${getBackendUrl()}/api/auth/me`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        set({ currentUser: data.user || data.data?.user || data });
      } else {
        removeAuthToken();
        set({ currentUser: null });
      }
    } catch (err) {
      console.error(err);
    }
  }
}));
