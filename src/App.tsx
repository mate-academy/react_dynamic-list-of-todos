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

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todosFromServer}
                setFiltredTodos={setFiltredTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todosFromServer.length > 0 && (
                <TodoList
                  todos={filtredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal todo={selectedTodo} setSelectedTodoId={setTodo} />
      )}
    </>
  );
};
