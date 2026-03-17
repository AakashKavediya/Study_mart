'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Search, Menu, MessageSquare, Bell, Heart, LogOut, PackageSearch } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSidebarOpen } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice';

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const unreadMessages = useAppSelector(state => 
    Object.values(state.chat.chats).reduce((acc, chat) => acc + chat.unreadCount, 0)
  );
  
  // Hide navbar on auth pages & landing
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-3 w-1/4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-foreground"
            onClick={() => dispatch(setSidebarOpen(true))}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/home" className="flex items-center gap-2 group">
            <div className="bg-accent text-accent-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg hidden sm:block tracking-tight">StudyMart</span>
          </Link>
        </div>

        {/* Center: Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search for items, events..."
            className="w-full bg-muted/30 border border-border text-foreground rounded-full h-10 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-2 w-1/4">
          <Link href="/search" className="md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Link href="/wishlist">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent hover:bg-accent/10">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/lost">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent hover:bg-accent/10" title="Lost & Found">
                    <PackageSearch className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/chat" className="relative">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent hover:bg-accent/10">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  {unreadMessages > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-background"></span>
                  )}
                </Link>
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent hover:bg-accent/10">
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="h-6 w-px bg-border mx-2"></div>
                <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <img src={user?.avatar || "https://github.com/shadcn.png"} alt="avatar" className="h-8 w-8 rounded-full border border-border object-cover" />
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-red-400"
                  onClick={() => dispatch(logout())}
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button className="bg-accent text-accent-foreground rounded-full px-6 font-semibold hover:scale-105 transition-transform">
                Sign In
              </Button>
            </Link>
          )}
        </div>
        
      </div>
    </header>
  );
}
