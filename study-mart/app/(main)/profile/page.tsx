'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { ProfileHeader } from '@/components/shared/ProfileHeader';
import { ProductCard } from '@/components/shared/ProductCard';

function ProfileContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const storedUser = useAppSelector(state => state.auth.user);
  
  const isOwnProfile = !id || (storedUser && id === storedUser.id);

  const userProfile = isOwnProfile ? {
    name: storedUser?.name || 'Jane Student',
    username: '@janestudies',
    bio: "CS Major 🌟\nSelling books and tech gear. Open to negotiations!",
    avatarUrl: storedUser?.avatar || 'https://i.pravatar.cc/150?u=jane',
    followers: 124,
    following: 78,
    listings: 8
  } : {
    name: 'Alex Student',
    username: '@alexsells',
    bio: "Business '24. Fast replies, meetups at dorms only.",
    avatarUrl: 'https://i.pravatar.cc/150?u=seller',
    followers: 432,
    following: 12,
    listings: 24
  };

  const userListings = Array.from({ length: 6 }).map((_, i) => ({
    id: `uprod-${i}`,
    title: `My Item ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    description: 'Good condition.',
    images: [`https://picsum.photos/seed/uprod${i}/400/400`],
    category: 'Books',
    sellerId: isOwnProfile ? (storedUser?.id || 'jane') : 'alex',
    condition: 'Good',
    createdAt: new Date().toISOString()
  }));

  return (
    <div className="pb-24">
      <ProfileHeader user={userProfile} />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {userListings.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {userListings.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No active listings.
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <React.Suspense fallback={<div className="p-20 text-center">Loading Profile...</div>}>
      <ProfileContent />
    </React.Suspense>
  );
}
