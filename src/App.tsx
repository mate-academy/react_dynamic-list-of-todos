import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { GlobalAppProvider } from './store/Store';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  return (
    <GlobalAppProvider>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </GlobalAppProvider>
  );
};
