"use client";

import { useDashboardStore } from "@/store";
import { Bell, Check, Trash2, CheckCircle2, MessageSquare, Combine, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useDashboardStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'status_update': return <CheckCircle2 className="h-5 w-5 text-blue-400" />;
      case 'official_response': return <MessageSquare className="h-5 w-5 text-purple-400" />;
      case 'merged': return <Combine className="h-5 w-5 text-orange-400" />;
      case 'resolved': return <Check className="h-5 w-5 text-emerald-400" />;
      case 'nearby': return <MapPin className="h-5 w-5 text-red-400" />;
      case 'ward_update': return <Building className="h-5 w-5 text-indigo-400" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Bell className="h-8 w-8 mr-3 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground">Stay updated on your reports and community issues.</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={markAllNotificationsAsRead}
            variant="outline" 
            className="bg-white/5 border-white/10 rounded-xl"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">You're all caught up!</h3>
            <p className="text-muted-foreground">No new notifications at the moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-5 flex gap-4 transition-colors hover:bg-white/5 ${!notif.isRead ? 'bg-primary/5' : ''}`}
                onClick={() => !notif.isRead && markNotificationAsRead(notif.id)}
              >
                <div className={`mt-1 shrink-0 p-3 rounded-xl ${!notif.isRead ? 'bg-primary/10 border border-primary/20' : 'bg-white/5 border border-transparent'}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-semibold ${!notif.isRead ? 'text-white' : 'text-white/80'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{notif.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notif.description}</p>
                </div>
                <div className="shrink-0 flex items-center">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
