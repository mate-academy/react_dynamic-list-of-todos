/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodosProvider } from './components/Context';
import { AppContent } from './components/AppContent';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <AppContent />
    </TodosProvider>
  );
};
