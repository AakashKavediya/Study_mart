'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LostItemForm } from '@/components/shared/LostItemForm';

export default function CreateLostPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 mb-24 md:mb-10 min-h-screen">

      {/* Page Header */}
      <div className="mb-8">
        <Link
          href="/lost"
          className="inline-flex items-center gap-2 text-[#666] hover:text-white transition-colors text-sm mb-5 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Lost & Found
        </Link>

        <h1 className="text-3xl font-bold text-white mb-1">Post an Item</h1>
        <p className="text-[#666] text-sm">
          Fill in the details below to help someone find what they're looking for.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-3xl p-6 md:p-8 shadow-xl">
        <LostItemForm />
      </div>
    </div>
  );
}
