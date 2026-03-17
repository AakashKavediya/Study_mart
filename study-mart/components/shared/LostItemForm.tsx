'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { createLostItem } from '@/store/slices/lostSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { UploadCloud, MapPin, Loader2 } from 'lucide-react';

export function LostItemForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [type, setType] = React.useState<'Lost' | 'Found'>('Lost');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await dispatch(createLostItem({
      type,
      title,
      description,
      location: location || undefined,
      image: imagePreview || undefined,
      userId: 'me',
    }));

    router.push('/lost');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Type Toggle */}
      <div className="space-y-2">
        <Label className="text-sm text-[#888]">Type</Label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#1A1A1A] rounded-xl border border-[#2a2a2a]">
          {(['Lost', 'Found'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === t
                  ? t === 'Lost'
                    ? 'bg-red-500/20 text-red-400 shadow-sm'
                    : 'bg-green-500/20 text-green-400 shadow-sm'
                  : 'text-[#555] hover:text-[#888]'
              }`}
            >
              {t === 'Lost' ? '🔴' : '🟢'} {t} Item
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label className="text-sm text-[#888]">Photo</Label>
        {imagePreview ? (
          <div className="relative rounded-2xl overflow-hidden border border-[#2a2a2a] group">
            <img src={imagePreview} alt="Preview" className="w-full h-52 object-cover" />
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-[#2a2a2a] rounded-2xl cursor-pointer bg-[#1A1A1A] hover:border-accent/40 hover:bg-[#1f1f1f] transition-all group">
            <UploadCloud className="h-9 w-9 text-[#444] group-hover:text-accent transition-colors mb-2" />
            <span className="text-sm font-medium text-[#555] group-hover:text-[#888] transition-colors">
              Click to upload a photo
            </span>
            <span className="text-xs text-[#444] mt-1">PNG, JPG up to 10MB</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        )}
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="lost-title">Title</Label>
        <Input
          id="lost-title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Black Hydroflask, AirPods Case..."
          required
          className="bg-[#1A1A1A] border-[#2a2a2a] h-12 focus-visible:ring-accent/50"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="lost-desc">Description</Label>
        <textarea
          id="lost-desc"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe the item in detail – color, markings, any unique features..."
          required
          rows={4}
          className="flex w-full rounded-xl border border-[#2a2a2a] bg-[#1A1A1A] px-4 py-3 text-sm placeholder:text-[#555] focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none text-white"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="lost-loc" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#555]" /> Location (Optional)
        </Label>
        <Input
          id="lost-loc"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="e.g. Library 3rd Floor, Student Union..."
          className="bg-[#1A1A1A] border-[#2a2a2a] h-12 focus-visible:ring-accent/50"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-accent/20 transition-all"
      >
        {isSubmitting ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Posting...</>
        ) : (
          `Post ${type} Item`
        )}
      </Button>
    </form>
  );
}
