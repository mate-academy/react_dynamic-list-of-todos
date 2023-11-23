import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoContextProvider } from './components/TodoContext';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  return (
    <TodoContextProvider turnOffLoad={setIsLoadingTodos}>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              { isLoadingTodos && <Loader /> }
              <TodoList setModel={setIsModelOpen} />
            </div>
          </div>
        </div>
      </div>
      {
        isModelOpen && <TodoModal setModel={setIsModelOpen} />
      }
    </TodoContextProvider>
  );
};
