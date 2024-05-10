/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { TodoContext } from './contexts/TodoContext';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  return (
    <TodoContext.Provider
      value={{
        filterBy,
        setFilterBy,
        searchQuery,
        setSearchQuery,
        currentTodo,
        setCurrentTodo,
      }}
    >
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
    </TodoContext.Provider>
  );
};
