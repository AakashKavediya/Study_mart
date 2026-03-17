import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  itemIds: string[];
}

const initialState: WishlistState = {
  itemIds: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action: PayloadAction<string>) => {
      const index = state.itemIds.indexOf(action.payload);
      if (index >= 0) {
        state.itemIds.splice(index, 1);
      } else {
        state.itemIds.push(action.payload);
      }
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.itemIds = action.payload;
    }
  },
});

export const { toggleWishlistItem, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
