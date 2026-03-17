'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters } from '@/store/slices/productSlice';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

const CATEGORIES = ['All', 'Books', 'Electronics', 'Furniture', 'Clothing', 'Services'];

export function FilterPanel() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.products.filters);

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="category"
                checked={filters.category === cat}
                onChange={() => dispatch(setFilters({ category: cat }))}
                className="w-4 h-4 accent-accent bg-background border-border" 
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Price Range</h3>
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min ($)</Label>
            <Input 
              id="min-price"
              type="number"
              value={filters.minPrice}
              onChange={(e) => dispatch(setFilters({ minPrice: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
          <span className="text-muted-foreground mt-6">-</span>
          <div className="space-y-1">
            <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max ($)</Label>
            <Input 
              id="max-price"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => dispatch(setFilters({ maxPrice: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
