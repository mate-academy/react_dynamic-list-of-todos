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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [uploadError, setUploadError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [status, setStatus] = useState<Status>(Status.ALL);
  const [query, setQuery] = useState('');
  let visibleTodos = todosFromServer;
  const todoToModal = visibleTodos.find(todo => todo.id === selectedTodoId) || null;

  const getTodosFromServer = async () => {
    try {
      const todos = await getTodos();

      setTodosFromServer(todos);
    } catch (error) {
      setUploadError(true);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const selectTodo = (id: number) => {
    if (selectedTodoId === id) {
      return;
    }

    setSelectedTodoId(id);
  };

  visibleTodos = visibleTodos.filter(todo => {
    switch (status) {
      case Status.ALL:
        return true;

      case Status.ACTIVE:
        return !todo.completed;

      case Status.COMPLETED:
        return todo.completed;

      default:
        throw new Error('Unexpected status');
    }
  });

  if (query) {
    visibleTodos = visibleTodos.filter(todo => {
      const value = query.toLowerCase();
      const title = todo.title.toLowerCase();

      return title.includes(value);
    });
  }

  return (
    <>
      {uploadError
        ? (
          <div className="notification is-danger">
            Can not upload todos from server
          </div>
        )
        : (
          <>
            <div className="section">
              <div className="container">
                <div className="box">
                  <h1 className="title">Todos:</h1>

                  <div className="block">
                    <TodoFilter
                      query={query}
                      setQuery={setQuery}
                      setStatus={setStatus}
                      status={status}
                    />
                  </div>

                  <div className="block">
                    {visibleTodos.length
                      ? (
                        <TodoList
                          todos={visibleTodos}
                          selectTodo={selectTodo}
                          selectedTodoId={selectedTodoId}
                        />
                      )
                      : <Loader />}
                  </div>
                </div>
              </div>
            </div>
            {!!selectedTodoId
              && (
                <TodoModal
                  todo={todoToModal}
                  selectTodo={selectTodo}
                />
              )}
          </>
        )}
    </>
  );
};
