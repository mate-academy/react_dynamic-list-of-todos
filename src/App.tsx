/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('All');
  const [query, setQuery] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQueryDelete = () => {
    setQuery('');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
  };

  const prepareTodos = () => {
    let visibleTodos = [...todos];

    if (query.trim() !== '') {
      visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(query.trim().toLowerCase()));
    }

    switch (filterBy) {
      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;

      case 'active':
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;

      default:
        return visibleTodos;
    }

    return visibleTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                onFilterChange={handleFilterChange}
                query={query}
                onChangeQuery={handleQueryChange}
                onClearQuery={handleQueryDelete}
              />
            </div>

            <div className="block">
              {loading && <Loader /> }
              <TodoList
                todos={prepareTodos()}
                onSelect={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        onDelete={() => setSelectedTodo(null)}
      />
    </>
  );
};
