// src/store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// User Reducer
const initialUserState = {
  user: null,
};

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload, 
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// Admin Reducer
const initialAdminState = {
  admin: null,
};

function adminReducer(state = initialAdminState, action) {
  switch (action.type) {
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload, // Save admin user data
      };
    case 'ADMIN_LOGOUT':
      return {
        ...state,
        admin: null,
      };
    default:
      return state;
  }
}

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
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
