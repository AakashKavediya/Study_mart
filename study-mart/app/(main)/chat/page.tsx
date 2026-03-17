import { MessageSquare } from 'lucide-react';

export default function ChatIndexPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-6 border-4 border-background shadow-xl">
        <MessageSquare className="h-10 w-10 text-accent" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Your Messages</h2>
      <p className="text-muted-foreground max-w-sm">
        Send private messages, negotiate prices, and arrange campus meetups seamlessly.
      </p>
    </div>
  );
}
