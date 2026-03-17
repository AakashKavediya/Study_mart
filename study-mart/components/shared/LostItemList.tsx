'use client';

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchLostItems } from '@/store/slices/lostSlice';
import { LostItemCard } from './LostItemCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface LostItemListProps {
  filter?: 'All' | 'Lost' | 'Found';
}

export function LostItemList({ filter = 'All' }: LostItemListProps) {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(state => state.lost);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLostItems());
    }
  }, [dispatch, status]);

  const filteredItems = filter === 'All'
    ? items
    : items.filter(i => i.type === filter);

  if (status === 'loading' && items.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#2a2a2a]">
            <Skeleton className="h-48 w-full rounded-none bg-[#222]" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-1/3 bg-[#222]" />
              <Skeleton className="h-5 w-3/4 bg-[#222]" />
              <Skeleton className="h-4 w-full bg-[#222]" />
              <Skeleton className="h-4 w-2/3 bg-[#222]" />
              <Skeleton className="h-9 w-full rounded-xl mt-4 bg-[#222]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-16 text-red-400">
        <p className="mb-2 font-semibold">Failed to load items</p>
        <p className="text-sm text-[#555]">{error}</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-20 text-[#555] flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-[#222] flex items-center justify-center text-3xl">
          🔍
        </div>
        <p className="font-medium text-[#888]">No {filter !== 'All' ? filter : ''} items posted yet</p>
        <p className="text-sm">Be the first to post something!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {filteredItems.map(item => (
        <LostItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
