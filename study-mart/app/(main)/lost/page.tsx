'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { LostItemList } from '@/components/shared/LostItemList';
import { cn } from '@/lib/utils';

type Filter = 'All' | 'Lost' | 'Found';

const FILTERS: Filter[] = ['All', 'Lost', 'Found'];

export default function LostPage() {
  const [activeFilter, setActiveFilter] = React.useState<Filter>('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mb-24 md:mb-10 min-h-screen relative">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Lost & Found</h1>
          <p className="text-[#666] text-sm">Help reunite the campus community with their belongings.</p>
        </div>

        {/* Desktop Post Button */}
        <Link
          href="/lost/create"
          className="hidden md:flex items-center gap-2 bg-accent text-white font-semibold px-5 py-3 rounded-xl hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" /> Post Item
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-[#2a2a2a] text-white rounded-full h-10 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all placeholder:text-[#555] text-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 p-1 bg-[#1A1A1A] rounded-xl border border-[#2a2a2a] w-fit">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200',
                activeFilter === f
                  ? 'bg-accent text-white shadow-sm shadow-accent/30'
                  : 'text-[#666] hover:text-white'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Item List */}
      <LostItemList filter={activeFilter} />

      {/* Floating Action Button — Mobile */}
      <Link
        href="/lost/create"
        className="md:hidden fixed bottom-24 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-2xl shadow-accent/40 hover:scale-110 active:scale-95 transition-all"
        aria-label="Post Item"
      >
        <Plus className="h-7 w-7" />
      </Link>

    </div>
  );
}
