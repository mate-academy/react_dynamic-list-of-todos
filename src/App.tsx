/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  // #region loading
  const [loadingTodos, setLoadingTodos] = useState(true);
  // #endregion

  // #region todos
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => {
        setLoadingTodos(false);
      });
  }, []);
  // #endregion

  // #region modal
  const [modal, setModal] = useState(false);
  const [todoForModal, setTodoForModal] = useState<Todo | undefined>();
  const [userForModal, setUserForModal] = useState<User>();

  useEffect(() => {
    if (!todoForModal) {
      return;
    }

    let isCancelled = false;

    setUserForModal(undefined);

    getUser(todoForModal.userId).then(user => {
      if (!isCancelled) {
        setUserForModal(user);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [todoForModal]);
  // #endregion

  // #region filter
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filteredTodos = todos
    .filter(todo => {
      if (query !== '') {
        return todo.title.toLowerCase().includes(query);
      } else {
        return true;
      }
    })
    .filter(todo => {
      if (status === 'active') {
        return todo.completed === false;
      } else if (status === 'completed') {
        return todo.completed === true;
      }

      return true;
    });
  // #endregion

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setInputQuery={setQuery} setSelectValue={setStatus} />
            </div>

            <div className="block">
              {filteredTodos && !loadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  setTodo={setTodoForModal}
                  setModal={setModal}
                  selectedId={selectedTodoId}
                  setSelectedId={setSelectedTodoId}
                />
              )}

              {filteredTodos && loadingTodos && <Loader />}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
          todoData={todoForModal}
          userData={userForModal}
          setModal={setModal}
          setSelectedId={setSelectedTodoId}
        />
      )}
    </>
  );
};
