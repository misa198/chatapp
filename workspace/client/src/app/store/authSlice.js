import { loginApi, registerApi } from "@/app/apis/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "@/common/constants";

export const loginThunk = createAsyncThunk("auth/login", async (params) => {
  const { data } = await loginApi(params);
  return data;
});


export const registerThunk = createAsyncThunk(
  "auth/register",
  async (params) => {
    try {
      const { data } = await registerApi(params);
      return data;
    } catch (e) {
      return Promise.reject(e.response?.status);
    }
  }
);

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
      window.location.href = "/";
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.login.loading = false;
      toast.error("Username or password is incorrect");
    });

    builder.addCase(registerThunk.fulfilled, () => {
      toast.success("Register success");
    });
    builder.addCase(registerThunk.rejected, (_state, action) => {
      if (action.error.message === "409") {
        toast.error("Username or email is already taken");
        return;
      }
      toast.error("Register failed");
    });
  },
});

export default slice.reducer;
