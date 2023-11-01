/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedPost, setSelectedPost] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(serverTodos => {
        setTodos(serverTodos);
        setFilteredTodos(serverTodos);
        setIsLoading(false);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setFilteredTodos={setFilteredTodos}
              />
            </div>

            <div className="block">
              {isLoading || todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                  />
                )}
            </div>
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
