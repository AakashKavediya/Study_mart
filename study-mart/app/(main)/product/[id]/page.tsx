'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Heart, MessageSquare, Share2, MapPin, Tag, Box, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toggleWishlistItem } from '@/store/slices/wishlistSlice';
import { ImageCarousel } from '@/components/shared/ImageCarousel';
import { setActiveChat } from '@/store/slices/chatSlice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Find product in Redux store
  const product = useAppSelector(state => 
    state.products.items.find(p => p.id === id)
  );
  
  const wishlistItems = useAppSelector(state => state.wishlist.itemIds);
  const isWishlisted = product ? wishlistItems.includes(product.id) : false;

  // Mock fetch if not found in store (e.g. direct link)
  // In real app, we would dispatch a thunk to fetch single product here

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => router.push('/home')}>Back to Home</Button>
      </div>
    );
  }

  const handleChat = () => {
    // Navigate to chat/create chat with sellerId
    dispatch(setActiveChat(`chat-${product.sellerId}`));
    router.push(`/chat/chat-${product.sellerId}`);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 md:py-10 mb-20 md:mb-0">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left: Images */}
        <div className="sticky top-24 h-max">
          <ImageCarousel 
            images={product.images.length ? product.images : ['https://via.placeholder.com/800']} 
            className="aspect-square md:aspect-[4/5] shadow-xl"
          />
        </div>

        {/* Right: Details */}
        <div className="space-y-8 flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold tracking-wider text-accent uppercase">
                {product.category}
              </span>
              <span className="text-sm text-muted-foreground">
                Posted {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {product.title}
            </h1>
            <div className="text-4xl font-extrabold text-foreground">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-muted rounded-xl text-foreground">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="font-semibold text-foreground">{product.condition}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-muted rounded-xl text-foreground">
                <Box className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold text-green-500">Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 col-span-2">
              <div className="p-3 bg-muted rounded-xl text-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">North Campus Dorms</p>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?u=seller" alt="seller" className="w-14 h-14 rounded-full object-cover border-2 border-border" />
              <div>
                <p className="font-semibold text-foreground text-lg">Alex Student</p>
                <p className="text-sm text-muted-foreground">Joined Fall 2022</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push(`/profile?id=${product.sellerId}`)}>
              View Profile
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto pt-4">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg rounded-xl shadow-lg shadow-accent/20"
              onClick={handleChat}
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Handle Deal
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-14 w-14 rounded-xl border-border bg-card hover:bg-muted"
              onClick={() => dispatch(toggleWishlistItem(product.id))}
            >
              <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-accent text-accent' : 'text-foreground'}`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-14 w-14 rounded-xl border-border bg-card hover:bg-muted"
            >
              <Share2 className="h-6 w-6 text-foreground" />
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
