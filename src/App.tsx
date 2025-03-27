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
  const [shownTodos, setShownTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTodo, setModalTodo] = useState<Todo | null>();
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);

  const openModal = (todo: Todo) => {
    setModalTodo(todo);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(todos => {
      setTodosFromServer(todos);
      setShownTodos(todos);
      setIsLoading(false);
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
                todosToFilter={todosFromServer}
                applyFilters={todos => setShownTodos(todos)}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={shownTodos}
                onTodoSelect={openModal}
                selectedId={modalTodo?.id}
              />
            </div>
          </div>
        </div>
      </div>

      {modalTodo && (
        <TodoModal
          todo={modalTodo as Todo}
          onModalClose={() => setModalTodo(null)}
          key={`modal${modalTodo?.id}`}
        />
      )}
    </>
  );
};
