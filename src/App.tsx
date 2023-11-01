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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedPost, setSelectedPost] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setFilteredTodos(todosFromServer);
    });
  }, []);

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

              {todos.length !== 0
                ? (
                  <TodoList
                    todos={filteredTodos}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                  />
                )
                : (<Loader />)}
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
