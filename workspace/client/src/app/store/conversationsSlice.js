import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  listConversationsApi,
  listMessagesApi,
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

const slice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    messages: [],
  },
  reducers: {},
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
