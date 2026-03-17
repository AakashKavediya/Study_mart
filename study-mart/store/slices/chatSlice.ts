import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  participants: { id: string; name: string; avatar: string }[];
  lastMessage?: Message;
  unreadCount: number;
}

interface ChatState {
  activeChatId: string | null;
  chats: Chat[];
  messages: Record<string, Message[]>; // Keyed by chatId
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ChatState = {
  activeChatId: null,
  chats: [],
  messages: {},
  status: 'idle',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const { chatId } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(action.payload);
      
      // Update last message in chat list
      const chatIndex = state.chats.findIndex(c => c.id === chatId);
      if (chatIndex >= 0) {
        state.chats[chatIndex].lastMessage = action.payload;
      }
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    }
  },
});

export const { setActiveChat, addMessage, setChats } = chatSlice.actions;
export default chatSlice.reducer;
