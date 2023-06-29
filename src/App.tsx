/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
// import { event } from 'cypress/types/jquery';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleStatus = useCallback((selectedStatus: string) => {
    setStatus(selectedStatus);
  }, []);

  const handleQuery = useCallback((search: string) => {
    setQuery(search);
  }, []);

  const handleTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const filterTodos = useCallback((search: string, todoStatus: string) => {
    if (todoStatus === 'completed') {
      return todos.filter(todo => (
        todo.completed && todo.title.toLowerCase().includes(search.toLowerCase())
      ));
    }

    if (todoStatus === 'active') {
      return todos.filter(todo => (
        !todo.completed && todo.title.toLowerCase().includes(search.toLowerCase())
      ));
    }

    return todos.filter(todo => (
      todo.title.toLowerCase().includes(search.toLowerCase())));
  }, [query, status, todos]);

  const visibleTodos = filterTodos(query, status);

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleStatus={handleStatus}
                handleQuery={handleQuery}
                clearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {!isLoading
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    handleTodo={handleTodo}
                  />
                )
                : (<Loader />)}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          onClear={clearSelectedTodo}
        />
      )}
    </>
  );
};
