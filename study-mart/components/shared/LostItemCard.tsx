'use client';

import * as React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, MapPin, CheckCircle2, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { LostItem, Comment, addComment, claimItem } from '@/store/slices/lostSlice';
import { useAppDispatch } from '@/store/hooks';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LostItemCardProps {
  item: LostItem;
}

export function LostItemCard({ item }: LostItemCardProps) {
  const dispatch = useAppDispatch();
  const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isClaiming, setIsClaiming] = React.useState(false);

  const handleClaim = async () => {
    setIsClaiming(true);
    await new Promise(r => setTimeout(r, 600));
    dispatch(claimItem(item.id));
    setIsClaiming(false);
  };

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSending(true);
    await dispatch(addComment({ itemId: item.id, commentText }));
    setCommentText('');
    setIsSending(false);
  };

  const typeColors = {
    Lost: 'bg-red-500/10 text-red-400 border-red-500/20',
    Found: 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 group shadow-sm">
      {/* Image */}
      {item.image && (
        <div className="relative h-48 overflow-hidden bg-[#222]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A] via-transparent to-transparent" />

          {/* Badge overlay */}
          <div className={cn(
            'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border',
            typeColors[item.type]
          )}>
            {item.type}
          </div>

          {item.isClaimed && (
            <div className="absolute top-3 right-3 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Claimed
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        {/* Header – no image scenario */}
        {!item.image && (
          <div className="flex items-center gap-2 mb-2">
            <span className={cn('px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border', typeColors[item.type])}>
              {item.type}
            </span>
            {item.isClaimed && (
              <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Claimed
              </span>
            )}
          </div>
        )}

        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-[#888] line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[#555] mb-4">
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {item.location}
            </span>
          )}
          <span className="ml-auto">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-[#2a2a2a] pt-4">
          {/* Claim Button */}
          <Button
            size="sm"
            disabled={item.isClaimed || isClaiming}
            onClick={handleClaim}
            className={cn(
              "flex-1 font-semibold rounded-xl transition-all",
              item.isClaimed
                ? "bg-green-500/10 text-green-400 border border-green-500/20 cursor-not-allowed opacity-60"
                : "bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white shadow-none"
            )}
          >
            {isClaiming ? (
              <div className="w-4 h-4 border-2 border-accent/50 border-t-accent rounded-full animate-spin" />
            ) : item.isClaimed ? (
              <><CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Claimed</>
            ) : (
              'Claim Item'
            )}
          </Button>

          {/* Comment Toggle */}
          <button
            onClick={() => setIsCommentsOpen(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#888] hover:text-white hover:bg-[#2a2a2a] transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{item.comments.length}</span>
            {isCommentsOpen
              ? <ChevronUp className="h-3.5 w-3.5" />
              : <ChevronDown className="h-3.5 w-3.5" />
            }
          </button>
        </div>

        {/* Comments Accordion */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            isCommentsOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="border-t border-[#2a2a2a] pt-4 space-y-3">
            {/* Comment List */}
            {item.comments.length === 0 ? (
              <p className="text-sm text-[#555] text-center py-2">
                No comments yet. Be the first!
              </p>
            ) : (
              item.comments.map((comment) => (
                <CommentRow key={comment.id} comment={comment} />
              ))
            )}

            {/* Comment Input */}
            <form onSubmit={handleSendComment} className="flex items-center gap-2 pt-2 border-t border-[#2a2a2a]">
              <img
                src="https://i.pravatar.cc/150?u=jane"
                alt="me"
                className="w-8 h-8 rounded-full border border-[#333] shrink-0"
              />
              <Input
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-[#222] border-transparent rounded-full h-9 text-sm focus-visible:ring-accent/50 focus-visible:border-transparent px-4 placeholder:text-[#555]"
              />
              <button
                type="submit"
                disabled={!commentText.trim() || isSending}
                className="text-accent disabled:opacity-30 hover:text-accent/80 transition-colors shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <div className="flex items-start gap-3">
      <img
        src={comment.userAvatar}
        alt={comment.userName}
        className="w-7 h-7 rounded-full border border-[#333] shrink-0 mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white">{comment.userName}</span>
          <span className="text-xs text-[#555]">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-[#aaa] mt-0.5 leading-relaxed">{comment.text}</p>
      </div>
    </div>
  );
}
