import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch, { checkForAuthorization } from "../../utils/axios";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { clearAllJobsStore } from "../allJobs/AllJobsSlice";
import { clear } from "../job/JobSlice";

const initialState = {
  isLoading: false,
  isSidebarOpen: true,
  user: getUserFromLocalStorage(),
};

export const loginUser = createAsyncThunk(
  "user/userLogin",
  async (data, thunkAPI) => {
    try {
      const res = await customFetch.post("/auth/login", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/userRegister",
  async (data, thunkAPI) => {
    try {
      const res = await customFetch.post("/auth/register", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/userUpdate",
  async (data, thunkAPI) => {
    try {
      const res = await customFetch.patch("/auth/updateUser", data);
      return res.data;
    } catch (error) {
      return checkForAuthorization(error, thunkAPI);
    }
  }
);

export const clearAllStore = createAsyncThunk(
  "user/clearAllStore",
  async (message, thunkAPI) => {
    try {
      //logout user
      thunkAPI.dispatch(logoutUser(message));
      //clear filter and displayed jobs state
      thunkAPI.dispatch(clearAllJobsStore());
      //clear add(edit) job state
      thunkAPI.dispatch(clear());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome! ${user.name}`);
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome back! ${user.name}`);
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("changes updated");
    });

    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    builder.addCase(clearAllStore.rejected, (state) => {
      toast.error("There was an error...");
    });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
