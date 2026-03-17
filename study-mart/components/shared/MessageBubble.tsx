import { Message } from '@/store/slices/chatSlice';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  avatarUrl?: string;
  showAvatar?: boolean;
}

export function MessageBubble({ message, isOwn, avatarUrl, showAvatar = true }: MessageBubbleProps) {
  return (
    <div className={cn(
      "flex w-full mt-2 gap-2", 
      isOwn ? "justify-end" : "justify-start"
    )}>
      {!isOwn && (
        <div className="w-8 shrink-0 flex items-end">
          {showAvatar && (
            <img 
              src={avatarUrl || "https://github.com/shadcn.png"} 
              alt="avatar" 
              className="w-8 h-8 rounded-full border border-border"
            />
          )}
        </div>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[75%] lg:max-w-[60%]",
        isOwn ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-4 py-2 text-sm shadow-sm",
          isOwn 
            ? "bg-accent text-accent-foreground rounded-2xl rounded-br-sm" 
            : "bg-muted text-foreground rounded-2xl rounded-bl-sm border border-border"
        )}>
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground/60 mt-1 px-1">
          {format(new Date(message.createdAt), 'h:mm a')}
        </span>
      </div>
    </div>
  );
}
