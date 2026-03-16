import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import RentalStore from './store/RentalStore';

export const Context = createContext(null);

const root = createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    rental: new RentalStore()
  }}>
    <App />
  </Context.Provider>
);
