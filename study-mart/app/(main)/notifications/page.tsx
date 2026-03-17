'use client';

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { markAsRead, markAllAsRead } from '@/store/slices/notificationSlice';
import { Bell, Tag, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const { items, unreadCount } = useAppSelector(state => state.notifications);

  // Mock initial notifications if empty
  const displayItems = items.length > 0 ? items : [
    { id: '1', title: 'Price Drop Alert', message: 'Intro to Psychology dropped by $10', read: false, createdAt: new Date().toISOString(), type: 'alert' },
    { id: '2', title: 'New Message', message: 'Alex sent you a message about your listing', read: false, createdAt: new Date(Date.now() - 3600000).toISOString(), type: 'message' },
    { id: '3', title: 'Listing Approved', message: 'Your "Desk Lamp" is now live!', read: true, createdAt: new Date(Date.now() - 86400000).toISOString(), type: 'success' },
  ];

  const getIcon = (type?: string) => {
    switch(type) {
      case 'alert': return <Tag className="h-5 w-5 text-orange-500" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'success': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default: return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl mb-20 md:mb-0">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-accent/10 p-3 rounded-2xl text-accent relative">
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your activity</p>
          </div>
        </div>
        {displayItems.some(i => !i.read) && (
          <Button variant="ghost" onClick={() => dispatch(markAllAsRead())} className="text-sm font-medium hover:text-accent">
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {displayItems.map((notification) => (
          <div 
            key={notification.id}
            onClick={() => dispatch(markAsRead(notification.id))}
            className={cn(
              "flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer",
              notification.read 
                ? "bg-card border-border hover:border-border/80 opacity-70" 
                : "bg-accent/5 border-accent/20 shadow-sm"
            )}
          >
            <div className={cn(
              "mt-1 p-2 rounded-xl shrink-0",
              notification.read ? "bg-muted" : "bg-background shadow-xs border border-border"
            )}>
              {getIcon((notification as any).type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className={cn(
                  "font-semibold text-base",
                  notification.read ? "text-foreground" : "text-foreground"
                )}>
                  {notification.title}
                </h3>
                <span className="text-xs text-muted-foreground shrink-0 mt-1 whitespace-nowrap">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className={cn(
                "text-sm mb-2",
                notification.read ? "text-muted-foreground" : "text-foreground/90 font-medium"
              )}>
                {notification.message}
              </p>
            </div>
            
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-accent mt-3 shrink-0" />
            )}
          </div>
        ))}
        
        {displayItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            You're all caught up!
          </div>
        )}
      </div>
    </div>
  );
}
