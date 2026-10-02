"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/store';
import { cn } from "cn";
import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Map as MapIcon,
  Bell,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Report Issue', href: '/report-issue', icon: AlertTriangle },
  { name: 'My Reports', href: '/my-reports', icon: FileText },
  { name: 'Map View', href: '/map', icon: MapIcon },
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: true },
  { name: 'District-wise Stats', href: '/district-stats', icon: BarChart3 },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser, notifications } = useDashboardStore();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 bg-card border-r border-white/5 z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-xl">
            <AlertTriangle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">CivicConnect</h1>
            <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">Stronger Communities</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "bg-gradient-to-r from-primary/20 to-transparent text-primary subtle-glow" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "group-hover:text-white")} />
                <span className="font-medium">{item.name}</span>
              </div>
              {item.badge && unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-4 mb-4 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-map-pattern opacity-10 mix-blend-overlay"></div>
          <p className="text-sm font-medium text-white/90 relative z-10 leading-snug">
            A cleaner, safer and better tomorrow starts with you.
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser?.name || 'Guest User'}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-sm font-medium">{currentUser?.badge || 'Citizen'}</span>
              <span className="text-xs text-muted-foreground truncate">{currentUser?.district || ''}</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
