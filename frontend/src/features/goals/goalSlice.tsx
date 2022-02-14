import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token)
    } catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(id, token)
    } catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state: any) => initialState,
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(createGoal.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal: any) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
