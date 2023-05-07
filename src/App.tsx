/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo, FilterType } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterSelect, setFilterSelect] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);

  const onSelectedTodo = (todoId: number) => {
    setSelectedTodo(todos.find(todo => todo.id === todoId) || null);
  };

  const setClose = () => {
    setSelectedTodo(null);
  };

  const searchByInput = (todoTitle: string, searchInput: string) => {
    return todoTitle.toLowerCase().includes(searchInput.toLowerCase());
  };

  useEffect(() => {
    getTodos().then(todo => {
      setTodos(todo);
      setInitialTodos(todo);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setTodos(
      initialTodos.filter(({ title, completed }) => {
        switch (filterSelect) {
          case FilterType.ALL:
            return searchByInput(title, query);

          case FilterType.ACTIVE:
            return !completed && searchByInput(title, query);

          case FilterType.COMPLETED:
            return completed && searchByInput(title, query);

          default:
            throw new Error('Something went wrong, contact support');
        }
      }),
    );
  }, [initialTodos, query, filterSelect]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterSelect={setFilterSelect}
                query={query}
                setQuery={setQuery}
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

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setClose={setClose}
        />
      )}
    </>
  );
};
