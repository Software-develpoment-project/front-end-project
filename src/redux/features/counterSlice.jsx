import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : null,
  categoryid: null,
  editQuiz:null,
  categories:null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload
    },
    setQuiz: (state, action) => {
      state.editQuiz = action.payload
    },
    setCategoriesList: (state,action) => {
      state.categories = action.payload
    },

  },
})

export const { setUser,setQuiz, setCategoriesList } = counterSlice.actions

// Selector
export const selectCounter = state => state.counter.value

export default counterSlice.reducer
