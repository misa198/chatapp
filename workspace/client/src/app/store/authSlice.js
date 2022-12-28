import { loginApi } from "@/app/apis/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "@/common/constants";

export const loginThunk = createAsyncThunk("auth/login", async (params) => {
  console.log("loginThunk");
  const { data } = await loginApi(params);
  return data;
});

const slice = createSlice({
  name: "auth",
  initialState: {
    login: {
      loading: false,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginThunk.pending, (state) => {
      state.login.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.login.loading = false;
      Cookies.set(TOKEN_KEY, action.payload.token);
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.login.loading = false;
      toast.error("username or password is incorrect");
    });
  },
});

export default slice.reducer;
