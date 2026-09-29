"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';
import { LayoutDashboard, AlertTriangle, FileText, Map as MapIcon, User } from 'lucide-react';

const mobileNavItems = [
  { name: 'Home', href: '/', icon: LayoutDashboard },
  { name: 'Report', href: '/report-issue', icon: AlertTriangle },
  { name: 'Map', href: '/map', icon: MapIcon },
  { name: 'My Reports', href: '/my-reports', icon: FileText },
  { name: 'Profile', href: '/settings', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around h-16">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-primary rounded-b-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              )}
              <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
