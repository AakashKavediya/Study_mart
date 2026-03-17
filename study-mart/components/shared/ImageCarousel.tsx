'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prev = () => setCurrentIndex(curr => curr === 0 ? images.length - 1 : curr - 1);
  const next = () => setCurrentIndex(curr => curr === images.length - 1 ? 0 : curr + 1);

  if (!images?.length) return null;

  return (
    <div className={cn("relative group overflow-hidden rounded-2xl bg-muted w-full border border-border", className)}>
      <div 
        className="flex transition-transform duration-500 ease-out h-full" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="min-w-full h-full relative">
            <img 
              src={src} 
              alt={`slide ${i}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="default" 
              size="icon" 
              className="rounded-full bg-background/80 text-foreground hover:bg-background/90 w-8 h-8 opacity-70 hover:opacity-100 backdrop-blur"
              onClick={prev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="rounded-full bg-background/80 text-foreground hover:bg-background/90 w-8 h-8 opacity-70 hover:opacity-100 backdrop-blur"
              onClick={next}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === currentIndex ? "bg-accent scale-125" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
