'use client';

import * as React from 'react';
import { useAppSelector } from '@/store/hooks';
import { ProductCard } from '@/components/shared/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const wishlistIds = useAppSelector(state => state.wishlist.itemIds);
  const allProducts = useAppSelector(state => state.products.items);
  
  // Get full product objects for wishlisted IDs
  const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mb-20 md:mb-0">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
        <div className="bg-accent/10 p-3 rounded-2xl text-accent">
          <Heart className="h-6 w-6 fill-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Items</h1>
          <p className="text-muted-foreground">{wishlistIds.length} items saved for later</p>
        </div>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={`wishlist-${product.id}`} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 flex flex-col items-center justify-center bg-card border border-border rounded-3xl">
          <Heart className="h-16 w-16 text-muted mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">No saved items yet</h2>
          <p className="text-muted-foreground max-w-sm mb-6">
            Tap the heart icon on any product to save it here for quick access later.
          </p>
          <Link href="/home">
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-accent/20">Explore Marketplace</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
