'use client';

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productSlice';
import { ProductCard } from '@/components/shared/ProductCard';
import { FilterPanel } from '@/components/shared/FilterPanel';
import { Skeleton } from '@/components/ui/Skeleton';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, hasMore, page } = useAppSelector(state => state.products);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);

  React.useEffect(() => {
    if (status === 'idle' && items.length === 0) {
      dispatch(fetchProducts(1));
    }
  }, [status, dispatch, items.length]);

  // Simple intersection observer for infinite scroll
  const loaderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && status !== 'loading') {
        dispatch(fetchProducts(page));
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, status, page, dispatch]);

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      
      {/* Mobile Top Actions */}
      <div className="flex justify-between items-center md:hidden mb-6">
        <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsMobileFilterOpen(true)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">Explore</h2>
            <FilterPanel />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <Modal 
          isOpen={isMobileFilterOpen} 
          onClose={() => setIsMobileFilterOpen(false)}
          title="Filters"
        >
          <FilterPanel />
          <Button 
            className="w-full mt-6" 
            onClick={() => setIsMobileFilterOpen(false)}
          >
            Apply Filters
          </Button>
        </Modal>

        {/* Main Feed */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {items.map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}
            
            {status === 'loading' && (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={`skel-${i}`} className="space-y-3">
                  <Skeleton className="h-48 md:h-64 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            )}
          </div>
          
          {/* Infinite Scroll trigger */}
          <div ref={loaderRef} className="h-20 w-full flex items-center justify-center mt-8">
            {status === 'loading' && items.length > 0 && (
              <div className="w-8 h-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            )}
            {!hasMore && items.length > 0 && (
              <p className="text-muted-foreground text-sm font-medium">You've reached the end!</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
