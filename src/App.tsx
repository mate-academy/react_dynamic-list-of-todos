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
import { Filters } from './types/Filters';
import { filter } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedPost, setSelectedPost] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<Filters>(Filters.all);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(error => setErrorMessage(error));
  }, []);

  const filteredTodos = filter(todos, filterBy, query);

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
                setFilterBy={setFilterBy}
              />
            </div>

            {errorMessage
              ? (
                <p className="block">
                  {errorMessage}
                </p>
              )
              : (
                <div className="block">

                  {todos.length
                    ? (
                      <TodoList
                        todos={filteredTodos}
                        setSelectedPost={setSelectedPost}
                        selectedPost={selectedPost}
                      />
                    )
                    : (<Loader />)}
                </div>
              )}

          </div>
        </div>
      </div>
      {selectedPost && (
        <TodoModal
          setSelectedPost={setSelectedPost}
          selectedPost={selectedPost}
        />
      )}
    </>
  );
};
