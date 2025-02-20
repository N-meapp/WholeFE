import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App.jsx';
import { persistor, store } from './redux/app/store.js';

// Create the context
export const SearchContext = createContext();

// Create a provider component
const SearchProvider = ({ children }) => {
  const [searchKey, setSearchKey] = useState(null);

  return (
    <SearchContext.Provider value={{searchKey, setSearchKey }}>
      {children}
    </SearchContext.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
