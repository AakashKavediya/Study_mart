import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface LostItem {
  id: string;
  type: 'Lost' | 'Found';
  title: string;
  description: string;
  location?: string;
  image?: string;
  createdAt: string;
  userId: string;
  isClaimed: boolean;
  comments: Comment[];
}

interface LostState {
  items: LostItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LostState = {
  items: [],
  status: 'idle',
  error: null,
};

// API-ready Mock Thunks
export const fetchLostItems = createAsyncThunk(
  'lost/fetchLostItems',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      const mockItems: LostItem[] = [
        {
          id: 'l1',
          type: 'Lost',
          title: 'AirPods Pro Case',
          description: 'White case with a small scratch on the back. Dropped near the library.',
          location: 'Library 3rd Floor',
          image: 'https://picsum.photos/seed/lost1/600/400',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          userId: 'user123',
          isClaimed: false,
          comments: [
            {
              id: 'c1',
              userId: 'user456',
              userName: 'Alex Student',
              userAvatar: 'https://i.pravatar.cc/150?u=456',
              text: 'Are these the ones with the blue protector?',
              createdAt: new Date(Date.now() - 3600000).toISOString()
            }
          ]
        },
        {
          id: 'l2',
          type: 'Found',
          title: 'Black Hydroflask',
          description: 'Found a 32oz black hydroflask with some tech stickers on it.',
          location: 'Student Union Hub',
          image: 'https://picsum.photos/seed/found1/600/400',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          userId: 'user789',
          isClaimed: false,
          comments: []
        }
      ];
      return mockItems;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createLostItem = createAsyncThunk(
  'lost/createLostItem',
  async (newItem: Omit<LostItem, 'id' | 'createdAt' | 'isClaimed' | 'comments'>, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      return {
        ...newItem,
        id: `l${Date.now()}`,
        createdAt: new Date().toISOString(),
        isClaimed: false,
        comments: []
      } as LostItem;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'lost/addComment',
  async (payload: { itemId: string; commentText: string }, { getState, rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // We would ideally fetch user from state.auth here, but we'll mock for now assuming we are "Jane".
      const newComment: Comment = {
        id: `c${Date.now()}`,
        userId: 'me',
        userName: 'Jane Student',
        userAvatar: 'https://i.pravatar.cc/150?u=jane',
        text: payload.commentText,
        createdAt: new Date().toISOString()
      };
      
      return { itemId: payload.itemId, comment: newComment };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const lostSlice = createSlice({
  name: 'lost',
  initialState,
  reducers: {
    claimItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.isClaimed = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchLostItems.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchLostItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLostItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Create
      .addCase(createLostItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        const item = state.items.find(i => i.id === action.payload.itemId);
        if (item) {
          item.comments.push(action.payload.comment);
        }
      });
  }
});

export const { claimItem } = lostSlice.actions;
export default lostSlice.reducer;
