import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch, { checkForAuthorization } from "../../utils/axios";
import { toast } from "react-toastify";

const initialFiltersState = {
  search: "",
  searchStats: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const { search, searchStats, searchType, sort, page } =
      thunkAPI.getState().allJobs;

    let url = `/jobs?status=${searchStats}&sort=${sort}&jobType=${searchType}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const res = await customFetch.get(url);

      return res.data;
    } catch (error) {
      return checkForAuthorization(error, thunkAPI);
    }
  }
);

export const getStats = createAsyncThunk(
  "allJobs/getStats",
  async (_, thunkAPI) => {
    try {
      const res = await customFetch.get("/jobs/stats");

      return res.data;
    } catch (error) {
      if (error) return checkForAuthorization(error, thunkAPI);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",

  initialState,
  reducers: {
    showIsLoading: (state) => {
      state.isLoading = true;
    },
    hideIsLoading: (state) => {
      state.isLoading = false;
    },
    handleFilterChange: (state, { payload: { name, value } }) => {
      state[name] = value;
      state.page = 1;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState, page: 1 };
    },
    handlePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsStore: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      const { payload } = action;
      state.jobs = payload.jobs;
      state.totalJobs = payload.totalJobs;
      state.numOfPages = payload.numOfPages;
    });
    builder.addCase(getJobs.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    builder.addCase(getStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getStats.fulfilled,
      (state, { payload: { defaultStats, monthlyApplications } }) => {
        state.isLoading = false;
        state.stats = defaultStats;
        state.monthlyApplications = monthlyApplications;
      }
    );
    builder.addCase(getStats.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
  },
});

export const {
  showIsLoading,
  hideIsLoading,
  handleFilterChange,
  clearFilters,
  handlePage,
  clearAllJobsStore,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
