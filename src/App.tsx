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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  const getVisibleTodos = (
    allTodos: Todo[],
    searchQuery: string,
    selectedFilter: string,
  ) => {
    const lowerCase = (text: string) => text.toLowerCase().trim();
    let visibleTodos = [...allTodos];

    if (query) {
      visibleTodos = visibleTodos
        .filter(todo => lowerCase(todo.title).includes(lowerCase(searchQuery)));
    }

    return visibleTodos
      .filter(todo => {
        switch (selectedFilter) {
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          default:
            return visibleTodos;
        }
      });
  };

  useEffect(() => {
    getTodos()
      .then(allTodos => setTodos(getVisibleTodos(allTodos, query, filter)))
      .catch((error) => `Error when fetching todos ${error}`);
  }, [query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
