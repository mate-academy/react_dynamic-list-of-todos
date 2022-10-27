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
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusSelected, setStatusSelected] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
        setInitialTodos(todo);
        setIsLoading(false);
      });
  }, []);

  const onSelectedTodo = (todoId: number) => {
    setSelectedTodo(todos.find(todo => todo.id === todoId) || null);
  };

  const setClose = (item: null) => {
    setSelectedTodo(item);
  };

  const searchByInput = (todoTitle: string, searchInput: string) => {
    return todoTitle.toLowerCase().includes(searchInput.toLowerCase());
  };

  useEffect(() => {
    setTodos(
      initialTodos.filter(({ title, completed }) => {
        switch (statusSelected) {
          case 'all':
            return searchByInput(title, query);

          case 'active':
            return !completed && searchByInput(title, query);

          case 'completed':
            return completed && searchByInput(title, query);

          default:
            throw new Error('Something went wrong, contact support');
        }
      }),
    );
  }, [initialTodos, query, statusSelected]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setStatusSelected={setStatusSelected}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onSelectedTodo={onSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} setClose={setClose} />}
    </>
  );
};
