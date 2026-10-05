"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { useDashboardStore } from '@/store';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentUser, fetchUser } = useDashboardStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user has auth_token cookie
    const hasToken = document.cookie.includes('auth_token=');
    if (!hasToken) {
      router.replace('/login');
      return;
    }

    // Fetch user data if not already loaded
    if (!currentUser) {
      fetchUser().finally(() => setIsChecking(false));
    } else {
      setIsChecking(false);
    }
  }, [currentUser, fetchUser, router]);

  // Show loading while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 overflow-x-hidden">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
