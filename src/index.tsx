import { createRoot } from 'react-dom/client';

import { App } from './App';
import React from 'react';
import { GlobalProvider } from './context/ReduxContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
