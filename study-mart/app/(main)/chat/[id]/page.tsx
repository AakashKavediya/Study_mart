'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addMessage, setActiveChat } from '@/store/slices/chatSlice';
import { MessageBubble } from '@/components/shared/MessageBubble';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Send, Phone, Video, Info } from 'lucide-react';

export default function ChatDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [text, setText] = React.useState('');
  
  const chat = useAppSelector(state => state.chat.chats.find(c => c.id === id));
  const messages = useAppSelector(state => state.chat.messages[id as string] || []);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    dispatch(setActiveChat(id as string));
    return () => { dispatch(setActiveChat(null)); };
  }, [id, dispatch]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!chat) return <div className="p-8 text-center text-muted-foreground">Chat not found...</div>;

  const otherParticipant = chat.participants[1] || chat.participants[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    dispatch(addMessage({
      id: Date.now().toString(),
      chatId: id as string,
      senderId: 'me',
      content: text,
      createdAt: new Date().toISOString()
    }));
    setText('');
  };

  return (
    <div className="flex flex-col h-full h-screen md:h-full pb-16 md:pb-0">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden mr-1" onClick={() => router.push('/chat')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <img src={otherParticipant.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-border" />
          <div>
            <h3 className="font-bold text-foreground leading-tight">{otherParticipant.name}</h3>
            <p className="text-xs text-green-500 font-medium">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Button variant="ghost" size="icon" className="hover:text-accent"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="hover:text-accent"><Video className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="hover:text-foreground"><Info className="h-5 w-5" /></Button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <img src={otherParticipant.avatar} alt="avatar" className="w-20 h-20 rounded-full mb-4 opacity-50 grayscale" />
            <p>Start your conversation with {otherParticipant.name}</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const showAvatar = i === messages.length - 1 || messages[i + 1].senderId !== msg.senderId;
            return (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                isOwn={msg.senderId === 'me'} 
                avatarUrl={otherParticipant.avatar}
                showAvatar={showAvatar}
              />
            );
          })
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-border bg-card sticky min-h-24 md:min-h-16 bottom-16 md:bottom-0">
        <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
          <Input 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:ring-accent focus-visible:border-transparent px-5 h-12"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!text.trim()} 
            className="rounded-full shadow-lg shadow-accent/20 h-12 w-12 shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Send className="h-5 w-5 -ml-1 mt-1" />
          </Button>
        </form>
      </div>

    </div>
  );
}
