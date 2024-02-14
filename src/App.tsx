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
  const [loading, setLoading] = React.useState<boolean>(true);
  const [modal, setModal] = React.useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((res) => {
        setLoading(false);
        setTodosFromServer(res);
        setFiltredTodos(res);
      });
  }, []);

  const handleModal = (value: boolean, todo: Todo) => {
    setModal(value);
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todosFromServer={todosFromServer}
                setFiltredTodos={(v) => setFiltredTodos(v)}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                modal={modal}
                selectedTodo={selectedTodo}
                todosFromServer={filtredTodos}
                handleModal={(v, t) => handleModal(v, t)}
              />
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <TodoModal
          todo={selectedTodo}
          setModal={(v) => setModal(v)}
        />
      )}
    </>
  );
};
