'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, PlusSquare, Bell, User, PackageSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';

export function BottomTab() {
  const pathname = usePathname();
  const unreadMessages = useAppSelector(state => 
    Object.values(state.chat.chats).reduce((acc, chat) => acc + chat.unreadCount, 0)
  );
  const unreadNotifications = useAppSelector(state => state.notifications.unreadCount);

  const TABS = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Lost', href: '/lost', icon: PackageSearch },
    { name: 'Sell', href: '/sell', icon: PlusSquare },
    { name: 'Alerts', href: '/notifications', icon: Bell, badge: unreadNotifications },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  // Don't show on auth pages or desktop
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') return null;

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-card/80 backdrop-blur-lg border-t border-border z-50 px-6 py-3 pb-safe">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className="relative flex flex-col items-center gap-1"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-accent/20 text-accent scale-110" : "text-muted-foreground hover:text-foreground"
              )}>
                <tab.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              {tab.badge > 0 && (
                <div className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{tab.badge}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
