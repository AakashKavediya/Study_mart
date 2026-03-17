'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { ChatItem } from '@/components/shared/ChatItem';
import { setChats } from '@/store/slices/chatSlice';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const chats = useAppSelector(state => state.chat.chats);
  const activeChatId = useAppSelector(state => state.chat.activeChatId);

  // Mock fetching chat list
  React.useEffect(() => {
    if (chats.length === 0) {
      dispatch(setChats([
        {
          id: 'chat-1',
          participants: [{ id: 'user-2', name: 'Alex Student', avatar: 'https://i.pravatar.cc/150?u=a' }],
          unreadCount: 2,
          lastMessage: { id: 'm1', chatId: 'chat-1', senderId: 'user-2', content: 'Is the textbook still available?', createdAt: new Date().toISOString() }
        },
        {
          id: 'chat-2',
          participants: [{ id: 'user-3', name: 'Sam Dorm', avatar: 'https://i.pravatar.cc/150?u=b' }],
          unreadCount: 0,
          lastMessage: { id: 'm2', chatId: 'chat-2', senderId: 'me', content: 'I can meet at 4pm at the library.', createdAt: new Date(Date.now() - 3600000).toISOString() }
        }
      ]));
    }
  }, [dispatch, chats.length]);

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  const isChatOpenOnMobile = pathname !== '/chat';

  return (
    <div className="container mx-auto max-w-6xl px-0 md:px-4 py-0 md:py-6 h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] mb-16 md:mb-0">
      <div className="flex h-full bg-card md:border md:border-border md:rounded-3xl overflow-hidden shadow-sm">
        
        {/* Sidebar Chat List */}
        <div className={`
          flex-col w-full md:w-80 lg:w-96 border-r border-border shrink-0 bg-background/50
          ${isChatOpenOnMobile ? 'hidden md:flex' : 'flex'}
        `}>
          <div className="p-4 md:p-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
            <h2 className="text-xl font-bold text-foreground">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chats.map(chat => (
              <ChatItem 
                key={chat.id} 
                chat={chat} 
                isActive={activeChatId === chat.id || pathname === `/chat/${chat.id}`} 
              />
            ))}
            {chats.length === 0 && (
              <p className="p-4 text-center text-muted-foreground text-sm">No conversations yet.</p>
            )}
          </div>
        </div>

        {/* Main Conversation Area */}
        <div className={`
          flex-1 bg-card relative
          ${!isChatOpenOnMobile ? 'hidden md:block' : 'block w-full'}
        `}>
          {children}
        </div>

      </div>
    </div>
  );
}
