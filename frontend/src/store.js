import { combineReducers, legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const authInitial = {
  email: '',
  id: 0
}

const authChangeState = (state = authInitial, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Combine the reducers into a single reducer function
const rootReducer = combineReducers({
  changeState,
  authChangeState,
});

// Create the Redux store with the combined reducer
const store = createStore(
  rootReducer,
  // Optional: Add any middleware or enhancers here
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store
