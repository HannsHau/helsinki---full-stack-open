import { configureStore } from '@reduxjs/toolkit'

import aReducer from './reducers/anecdoteReducer'
import aFilter from './reducers/anecdoteFilter'

const store = configureStore({
  reducer: {
    notes: aReducer,
    filter: aFilter
  }
})

export default store