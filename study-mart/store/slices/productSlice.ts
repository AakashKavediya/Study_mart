import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  sellerId: string;
  condition: string;
  createdAt: string;
}

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
  page: number;
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    searchQuery: string;
  };
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
  hasMore: true,
  page: 1,
  filters: {
    category: 'All',
    minPrice: 0,
    maxPrice: 10000,
    searchQuery: '',
  },
};

// Mock fetch products thunk
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number, { getState }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Return mock data
    const mockProducts: Product[] = Array.from({ length: 12 }).map((_, i) => ({
      id: `prod-${page}-${i}`,
      title: `Product ${i + 1} (Page ${page})`,
      price: Math.floor(Math.random() * 500) + 10,
      description: 'A great product for your campus needs.',
      images: [`https://picsum.photos/seed/prod${page}${i}/400/400`],
      category: 'Electronics',
      sellerId: 'user-123',
      condition: 'Like New',
      createdAt: new Date().toISOString(),
    }));

    return { products: mockProducts, hasMore: page < 5 };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.items = []; // Reset items when filters change
      state.page = 1;
      state.hasMore = true;
      state.status = 'idle';
    },
    resetProducts: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload.products];
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setFilters, resetProducts } = productSlice.actions;
export default productSlice.reducer;
