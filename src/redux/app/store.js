// src/store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Define your initial state and reducers
const initialState = {
  user: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload, 
      };
    default:
      return state;
  }
}

// Combine reducers if you have more than one
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist Config
const persistConfig = {
  key: 'root', // key for the persisted data
  storage,     // localStorage (can also use sessionStorage or other storages)
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with the persisted reducer
const store = createStore(persistedReducer);

// Persistor for persisting the store
const persistor = persistStore(store);

export { store, persistor };
