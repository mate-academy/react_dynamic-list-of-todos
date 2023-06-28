/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(result => {
        setTodosFromServer(result);
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = todosFromServer
    .filter(todo => {
      switch (filter) {
        case 'all':
          return todo;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return todo;
      }
    })
    .filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ));

  const selectedTodo = visibleTodos.find(todo => todo.id === selectedTodoId) || null;

  const handleTodoSelect = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(0);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onChoose={handleTodoSelect}
                    selectedTodoId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        onClose={handleCloseModal}
      />
    </>
  );
};
