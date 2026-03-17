'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import { Product } from '@/store/slices/productSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleWishlistItem } from '@/store/slices/wishlistSlice';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.itemIds);
  const isWishlisted = wishlistItems.includes(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlistItem(product.id));
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-accent/10 hover:-translate-y-1">
        {/* Image Area */}
        <div className="relative aspect-square bg-muted">
          <Image
            src={product.images[0] || 'https://via.placeholder.com/400'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 transition-colors z-10"
          >
            <Heart 
              className={cn("h-5 w-5 transition-colors", isWishlisted ? "fill-accent text-accent" : "text-white")} 
            />
          </button>
          
          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-foreground">
            {product.condition}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          <div className="text-xs text-accent mb-1 font-semibold tracking-wider">
            {product.category.toUpperCase()}
          </div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 mb-1">
            {product.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
