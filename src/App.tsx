/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todoActiveFilter, setTodoActiveFilter] = useState('');
  const [modalActiveTodo, setModalActiveTodo] = useState<Todo | null>(null);

  const handleResetUser = () => {
    setModalActiveTodo(null);
  };

  const handleSetFilter = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setTodoActiveFilter(event.target.value);
  };

  const handleSetQuery = (event:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  const handleSetModalTodo = (todo: Todo) => {
    setModalActiveTodo(todo);
  };

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(
    () => {
      loadTodos();
    },
    [],
  );

  let preparedTodos = todos;

  useMemo(() => {
    switch (todoActiveFilter) {
      case 'active':
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      case 'all':
        setTodoActiveFilter('');
        break;
      default:
        break;
    }

    if (query) {
      preparedTodos = preparedTodos.filter(todo => todo.title.includes(query));
    }
  }, [todoActiveFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSetFilter={handleSetFilter}
                query={query}
                handleSetQuery={handleSetQuery}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={preparedTodos}
                    handleSetModalTodo={handleSetModalTodo}
                    modalActiveTodo={modalActiveTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalActiveTodo
        && (
          <TodoModal
            modalActiveTodo={modalActiveTodo}
            handleResetUser={handleResetUser}
          />
        )}
    </>
  );
};
