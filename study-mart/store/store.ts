import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import chatReducer from './slices/chatSlice';
import wishlistReducer from './slices/wishlistSlice';
import notificationReducer from './slices/notificationSlice';
import uiReducer from './slices/uiSlice';
import lostReducer from './slices/lostSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    chat: chatReducer,
    wishlist: wishlistReducer,
    notifications: notificationReducer,
    ui: uiReducer,
    lost: lostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
