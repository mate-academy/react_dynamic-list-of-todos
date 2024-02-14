/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = React.useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = React.useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodosFromServer(res);
        setFiltredTodos(res);
      })
      .finally(() => {
        setLoading(false);
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
                todosFromServer={todosFromServer}
                setFiltredTodos={setFiltredTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                selectedTodo={selectedTodo}
                todosFromServer={filtredTodos}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
