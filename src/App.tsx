import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import useTodos from './hooks/useTodos';
import filterTodos from './utils/filterTodos';

export const App: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { todos, isLoading } = useTodos();

  const filteredTodos = useMemo(
    () => filterTodos(todos, filter, searchQuery),
    [todos, filter, searchQuery],
  );

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              currentFilter={filter}
              setFilter={setFilter}
              query={searchQuery}
              setQuery={setSearchQuery}
            />
          </div>

          {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
        </div>
      </div>
    </div>
  );
};
