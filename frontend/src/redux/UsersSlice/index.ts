import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import swal from "sweetalert";

export const Login: any = createAsyncThunk(
  "Login",
  async (formData, navigate: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/user/login", formData, config);

      localStorage.setItem("token", response.data.STATUS_RESPONSE);
      if (response.data) {
        window.location.href = "/";
      }
      return response.data;
    } catch (error: any) {
      swal("Opps!", error.response.data.STATUS_RESPONSE, "error");
    }
  }
);

export const Signup: any = createAsyncThunk("Signup", async (formData) => {
  try {
    console.log({ formData });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`/user`, formData, config);
    swal("Success", "User created successfully", "success").then(() => {
      window.location.reload();
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.STATUS_RESPONSE);
    swal("Oops!", error.response.data.STATUS_RESPONSE, "error");
  }
});

export const getAllUsers: any = createAsyncThunk("getAllUsers", async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };
  const response = await axios.get(`/user`, config);
  return response.data.STATUS_RESPONSE;
});

export const MyProfile: any = createAsyncThunk("MyProfile", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    const response = await axios.get(`/user/loggedinuser`, config);

    return response.data.STATUS_RESPONSE;
  } catch (error: any) {
    console.log(error.response.data.STATUS_RESPONSE);
  }
});

export const UpdateProfile: any = createAsyncThunk(
  "UpdateProfile",
  async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.put(`/user`, formData, config);
      swal("Success", "Porifle updated successfully", "success");

      return response.data;
    } catch (error: any) {
      console.log(error.response.data.STATUS_RESPONSE);
      swal("Oops!", error.response.data.STATUS_RESPONSE, "error");
    }
  }
);
export const counter = createSlice({
  name: "product",
  initialState: {
    data: [],
    Myprofile: {},
    error: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // --------------login---------------

    builder.addCase(Login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(Login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    // --------------login---------------

    // --------------signup---------------
    builder.addCase(Signup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(Signup.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(Signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    // --------------signup---------------

    // --------------MyProfile---------------
    builder.addCase(MyProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(MyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.Myprofile = action.payload;
    });
    builder.addCase(MyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    // --------------MyProfile---------------

    // --------------UpdateProfile---------------
    builder.addCase(UpdateProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateProfile.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(UpdateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    // --------------UpdateProfile---------------

    // --------------getAllUsers---------------
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    // --------------getAllUsers---------------
  },
});

export default counter.reducer;
