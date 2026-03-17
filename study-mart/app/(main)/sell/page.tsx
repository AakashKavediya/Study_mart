'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, Image as ImageIcon, MapPin, Tag, Box, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function SellPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock image upload
    if (e.target.files && e.target.files.length > 0) {
      const fileUrls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...fileUrls].slice(0, 5)); // max 5
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    router.push('/home');
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 mb-20 md:mb-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">List an Item</h1>
        <p className="text-muted-foreground mt-2">Sell your textbooks, tech, or dorm essentials to other students.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        
        {/* Image Upload Area */}
        <div className="space-y-3">
          <Label className="text-base text-foreground">Photos</Label>
          <div className="grid grid-cols-3 gap-4">
            {images.map((url, i) => (
              <div key={i} className="aspect-square relative rounded-2xl overflow-hidden border border-border bg-muted">
                <img src={url} alt="upload preview" className="w-full h-full object-cover" />
              </div>
            ))}
            {images.length < 5 && (
              <label className="aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-xs font-medium text-muted-foreground">Upload Image</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Add up to 5 photos. First photo will be the cover.</p>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g., Intro to Psychology Textbook" required className="h-12 text-base bg-background" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" required className="h-12 text-base font-semibold bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" className="flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" required>
                <option value="" disabled selected>Select category...</option>
                <option value="Books">Books & Notes</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Dorm Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="condition" className="flex items-center gap-2"><Tag className="h-4 w-4" /> Condition</Label>
            <select id="condition" className="flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" required>
              <option value="New">Brand New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea 
              id="description" 
              rows={4} 
              placeholder="Describe what you're selling. Any flaws? Is price negotiable?"
              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Meetup Preference</Label>
            <Input id="location" placeholder="e.g., Library Cafe, North Dorms" required className="bg-background" />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold shadow-lg shadow-accent/20" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publishing...</>
          ) : (
            'Publish Listing'
          )}
        </Button>
      </form>
    </div>
  );
}
