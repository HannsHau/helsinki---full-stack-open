import { configureStore } from '@reduxjs/toolkit'

import aMessage from './reducers/anecdoteMessage'
import aReducer from './reducers/anecdoteReducer'
import aFilter from './reducers/anecdoteFilter'

const store = configureStore({
  reducer: {
    message: aMessage,
    notes: aReducer,
    filter: aFilter
  }
})

export default store