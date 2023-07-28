/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
// import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);

  const [isLoaderShown, setIsLoaderShown] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setIsLoaderShown(true);

    getTodos()
      .then((todos) => {
        setTodosFromServer(todos);
      })
      .finally(() => {
        setIsLoaderShown(false);
      });
  }, []);

  const handleClick = (item: Todo) => {
    setSelectedTodo(item);
  };

  const filteredTodos = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    return todosFromServer
      .filter(todo => {
        switch (status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }, [todosFromServer, query, status]);

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
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoaderShown
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    handleClick={handleClick}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (<TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />)}
    </>
  );
};
