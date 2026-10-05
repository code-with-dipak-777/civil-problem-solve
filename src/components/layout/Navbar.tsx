"use client";

import { Bell, Search, HelpCircle, Menu, LogOut, User, MapPin, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDashboardStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sidebar } from './Sidebar';

export function Navbar() {
  const { currentUser, notifications, logout } = useDashboardStore();
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

        <Popover>
          <PopoverTrigger asChild>
            <button className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 p-1 pr-3 hover:bg-white/5 transition-colors focus:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-white/90">Hi, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Guest'}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 bg-[#051726] border-white/10 rounded-xl overflow-hidden shadow-2xl mt-2">
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-6 flex flex-col items-center border-b border-white/5">
              <Avatar className="h-16 w-16 mb-3 border-2 border-background">
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback className="text-lg bg-emerald-500/20 text-emerald-400">CC</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg text-white">{currentUser?.name || 'Guest'}</h3>
              <p className="text-sm text-white/60">{currentUser?.email || 'guest@civicconnect.in'}</p>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Role</p>
                  <p className="font-medium">{currentUser?.role || 'Citizen'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Location</p>
                  <p className="font-medium">{currentUser?.district || 'Unknown'}, {currentUser?.city || 'Unknown'}</p>
                </div>
              </div>
            </div>

            <div className="p-2 border-t border-white/5">
              <button 
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
