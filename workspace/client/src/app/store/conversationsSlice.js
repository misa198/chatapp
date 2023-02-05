import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  listConversationsApi,
  listMessagesApi,
  sendMessageApi,
} from "@/app/apis/conversations";

export const listConversationsThunk = createAsyncThunk(
  "conversations/listConversations",
  async () => {
    const { data } = await listConversationsApi();
    return data;
  }
);

export const listMessagesThunk = createAsyncThunk(
  "conversations/listMessages",
  async (conversationId) => {
    const { data } = await listMessagesApi(conversationId);
    return data;
  }
);

export const sendMessageThunk = createAsyncThunk(
  "conversations/sendMessage",
  async (payload) => {
    const { conversationId, message } = payload;
    await sendMessageApi(conversationId, message);
  }
);

const slice = createSlice({
  name: "conversations",
  initialState: {
    currentConversationId: null,
    conversations: [],
    messages: [],
  },
  reducers: {
    setConversationId(state, action) {
      state.currentConversationId = action.payload;
    },
    addNewMessage(state, action) {
      const message = action.payload;
      if (message.conversationId === state.currentConversationId) {
      }
      state.messages.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(listConversationsThunk.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });

    builder.addCase(listMessagesThunk.pending, (state) => {
      state.messages = [];
    });
    builder.addCase(listMessagesThunk.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export default slice.reducer;
export const { setConversationId, addNewMessage } = slice.actions;
