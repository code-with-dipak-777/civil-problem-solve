"use client";

import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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
