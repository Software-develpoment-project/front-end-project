import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = counterSlice.actions

// Selector
export const selectCounter = state => state.counter.value

export default counterSlice.reducer
