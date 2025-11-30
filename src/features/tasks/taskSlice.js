import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import taskService from "./taskService";

export const createTask = createAsyncThunk(
  "create/task",
  async (formData, thunkAPI) => {
    try {
      return await taskService.createTask(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message
      );
    }
  }
);

// GET TASKS
export const getTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      return await taskService.getTasks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// UPDATE TASK
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await taskService.updateTask(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// DELETE TASK
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      const deleteTaskFromBC = await taskService.deleteTask(id);
      return deleteTaskFromBC;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const tasks = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    task: null,
    loading: false,
    error: null,
    search: "", // 🔥 add this
  },

  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // GET ALL
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.data;
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload.data;

        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default tasks.reducer;
export const { setSearch } = tasks.actions;
