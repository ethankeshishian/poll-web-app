import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk';

const composedEnhancer = compose(
  // Thunk allows us to use asynchronous calls to get data from the API
  applyMiddleware(thunk)
)

// Create centralized state store for app

const store = createStore(rootReducer, composedEnhancer)
export default store