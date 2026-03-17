import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  theme: 'light' | 'dark' | 'system';
  isFilterModalOpen: boolean;
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  theme: 'dark', // Defaulting to dark as requested
  isFilterModalOpen: false,
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<UiState['theme']>) => {
      state.theme = action.payload;
    },
    toggleFilterModal: (state) => {
      state.isFilterModalOpen = !state.isFilterModalOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    }
  },
});

export const { setTheme, toggleFilterModal, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
