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

enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>(FilterStatus.ALL);
  const [query, setQuery] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodosFromServer(data);
      })
      .finally(() => setIsDataLoaded(true));
  }, []);

  const filteredTodos = todosFromServer
    .filter(todo => {
      if (status === FilterStatus.ALL) {
        return true;
      }

      if (status === FilterStatus.ACTIVE) {
        return !todo.completed;
      }

      if (status === FilterStatus.COMPLETED) {
        return todo.completed;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!isDataLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setTodo={setSelectedTodo}
                  todoId={selectedTodo ? selectedTodo.id : undefined}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={setSelectedTodo} />
      )}
    </>
  );
};
