"use client";

import { Bell, Search, HelpCircle, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDashboardStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';

export function Navbar() {
  const { currentUser, notifications } = useDashboardStore();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-background/80 backdrop-blur-xl border-b border-white/5 px-6 transition-all">
      <div className="flex items-center gap-4 flex-1">
        <Sheet>
          <SheetTrigger className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-white">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-card border-r-0 w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex relative w-full max-w-md items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search issues, location or ward..."
            className="pl-10 pr-16 bg-white/5 border-white/10 h-12 rounded-xl text-white placeholder:text-muted-foreground focus-visible:ring-primary"
          />
          <div className="absolute right-3 px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] text-muted-foreground font-medium">
            Ctrl + K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-muted-foreground hover:text-white transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
        
        <button className="relative text-muted-foreground hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block"></div>

        <button className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 p-1 pr-3 hover:bg-white/5 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-white/90">Hi, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Guest'}</span>
        </button>
      </div>
    </header>
  );
}
