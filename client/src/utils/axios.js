import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearAllStore, logoutUser } from "../features/user/UserSlice";
const customFetch = axios.create({
  baseURL: "/api/v1",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkForAuthorization = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearAllStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
