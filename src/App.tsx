/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const getTodosFromServer = useCallback(async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setIsTodosLoaded(true);
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const handleTodoSelection = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleRemoveTodoSelection = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleSetQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSetStatus = useCallback((value: string) => {
    setStatus(value);
  }, []);

  const filterTodos = () => {
    let filteredTodos;

    switch (status) {
      case Status.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = todos;
    }

    if (query) {
      const preparedQuery = query.toLowerCase().trim();

      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(preparedQuery),
      );
    }

    return filteredTodos;
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
                onSetQuery={handleSetQuery}
                onSetStatus={handleSetStatus}
              />
            </div>

            <div className="block">
              {!isTodosLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    onTodoSelection={handleTodoSelection}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onRemoveTodoSelection={handleRemoveTodoSelection}
          />
        )}
    </>
  );
};
