import { toast } from "react-toastify";
import customFetch, { checkForAuthorization } from "../../utils/axios";
import { getJobs } from "../allJobs/AllJobsSlice";
import { showIsLoading, hideIsLoading } from "../allJobs/AllJobsSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isEditing: false,
  position: {
    value: "",
    valid: true,
  },
  company: { value: "", valid: true },
  jobLocation: {
    value: "",
    valid: true,
  },
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (data, thunkAPI) => {
    try {
      const res = await customFetch.post("/jobs", data);
      thunkAPI.dispatch(clear());
      return res.data;
    } catch (error) {
      return checkForAuthorization(error, thunkAPI);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id, thunkAPI) => {
    thunkAPI.dispatch(showIsLoading());
    try {
      const res = await customFetch.delete(`/jobs/${id}`);
      thunkAPI.dispatch(getJobs());

      return res.data.msg;
    } catch (error) {
      thunkAPI.dispatch(hideIsLoading());

      return checkForAuthorization(error, thunkAPI);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await customFetch.patch(`/jobs/${id}`, data);
      thunkAPI.dispatch(clear());

      return res.data;
    } catch (error) {
      return checkForAuthorization(error, thunkAPI);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value, valid } }) => {
      state[name].value = value;
      state[name].valid = valid;
    },
    handleSelectChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clear: () => {
      return { ...initialState };
    },
    handleEditJob: (
      state,
      { payload: { position, company, jobLocation, status, jobType, _id } }
    ) => {
      state.isEditing = true;
      state.company.value = company;
      state.position.value = position;
      state.jobLocation.value = jobLocation;
      state.status = status;
      state.jobType = jobType;
      state.editJobId = _id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("job created!");
    });
    builder.addCase(createJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });

    builder.addCase(deleteJob.fulfilled, (state, actions) => {
      toast.success(actions.payload);
    });
    builder.addCase(deleteJob.rejected, (state, actions) => {
      toast.error(actions.payload);
    });
    builder.addCase(editJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("job updated");
    });
    builder.addCase(editJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
  },
});

export const { handleChange, handleSelectChange, clear, handleEditJob } =
  jobSlice.actions;
export default jobSlice.reducer;
