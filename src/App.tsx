/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos);
    // .catch(setError);
  }, []);

  const handleSelectTodo = (todo: Todo) => () => {
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleSelectFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  let visibleTodos: Todo[] = [];

  if (todos) {
    visibleTodos = [...todos];

    switch (filter) {
      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;
      case 'active':
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      visibleTodos = visibleTodos.filter(todo => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={handleQueryChange}
                filter={filter}
                onSelectFilter={handleSelectFilter}
              />
            </div>

            <div className="block">
              {todos
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={handleSelectTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={handleClose} />}
    </>
  );
};
