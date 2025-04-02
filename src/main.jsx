import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App.jsx';
import { persistor, store } from './redux/app/store.js';

// Create the context
export const SearchContext = createContext();

export const HomeContext = createContext();


// Create a provider component
const SearchProvider = ({ children }) => {
  const [searchKey, setSearchKey] = useState(null);

  return (
    
    <SearchContext.Provider value={{searchKey, setSearchKey }}>
      {children}
    </SearchContext.Provider>
  );
};

const HomePageProvider = ({ children }) => {
  const [isHomePage,setIsHomePage] = useState(false);

  return (
    
    <HomeContext.Provider value={{isHomePage,setIsHomePage }}>
      {children}
    </HomeContext.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <HomePageProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </HomePageProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
