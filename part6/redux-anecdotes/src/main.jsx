import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import aReducer from './reducers/anecdoteReducer'
import aFilter from './reducers/anecdoteFilter'

const reducer = combineReducers ({
  notes: aReducer,
  filter: aFilter
})


const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
