import Link from 'next/link';
import { Chat } from '@/store/slices/chatSlice';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ChatItemProps {
  chat: Chat;
  isActive?: boolean;
}

export function ChatItem({ chat, isActive = false }: ChatItemProps) {
  const otherParticipant = chat.participants[1] || chat.participants[0];
  const lastMsg = chat.lastMessage;
  const timeStr = lastMsg ? formatDistanceToNow(new Date(lastMsg.createdAt), { addSuffix: false }) : '';

  return (
    <Link 
      href={`/chat/${chat.id}`}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer",
        isActive ? "bg-accent/10 hover:bg-accent/20" : "hover:bg-muted/50"
      )}
    >
      <div className="relative">
        <img 
          src={otherParticipant.avatar} 
          alt={otherParticipant.name} 
          className="w-12 h-12 rounded-full object-cover border border-border"
        />
        {chat.unreadCount > 0 && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground border-2 border-background shadow-sm">
            {chat.unreadCount}
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold text-sm text-foreground truncate pr-2">
            {otherParticipant.name}
          </h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {timeStr}
          </span>
        </div>
        
        <p className={cn(
          "text-sm truncate",
          chat.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"
        )}>
          {lastMsg?.content || "Start a conversation..."}
        </p>
      </div>
    </Link>
  );
}
