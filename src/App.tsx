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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [query, setQuery] = useState('');

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setHasLoadingError(false);
    } catch {
      setHasLoadingError(true);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const findTodo = (todoId: number) => {
    return todos.find(todo => todo.id === todoId);
  };

  const shownTodo = findTodo(selectedTodoId);

  const onShowButtonClick = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const oncloseButtonClick = () => {
    setSelectedTodoId(0);
  };

  const filterTodos = () => {
    let filteredTodos = todos.filter(todo => {
      switch (selectedStatus) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        case 'all':
        default:
          return true;
      }
    });

    if (query) {
      const normalizedQuery = query.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
    }

    return filteredTodos;
  };

  const visibleTodos = filterTodos();

  const isLoadingFinished = (hasLoadingError && todos.length === 0) || todos.length;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={selectedStatus}
                onStatusChange={setSelectedStatus}
                query={query}
                onInputChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoadingFinished
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onShowButtonClick={onShowButtonClick}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : (
                  <Loader />
                )}

              {hasLoadingError && (
                <p className="has-text-danger">
                  Can&apos;t load data from server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          selectedTodo={shownTodo!}
          oncloseButtonClick={oncloseButtonClick}
        />
      )}
    </>
  );
};
