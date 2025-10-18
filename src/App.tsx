/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);

  const [isShowModal, setIsShowModal] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checkedTodo, setCheckedTodo] = useState<Todo | undefined>(undefined);

  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  function handleOpenModal(userId: number, todoId: number) {
    setIsShowModal(true);
    setCheckedTodo(todos.find(todo => todo.id === todoId));
    setCurrentUser(null); // 👈 Очисти перед загрузкой!
    setSelectedTodoId(todoId);

    getUser(userId)
      .then(user => setCurrentUser(user))
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  }

  function closeModal() {
    setIsShowModal(false);
    setCurrentUser(null);
    setCheckedTodo(undefined);
    setSelectedTodoId(null);
  }

  useEffect(() => {
    setLoader(true);
    setErrorMessage('');
    getTodos()
      .then(data => setTodos(data))
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Unknown error');
        }
      })
      .finally(() => setLoader(false));
  }, []);

  function handleTodoFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  function handleInputQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleClearInput() {
    setQuery('');
  }

  const filtredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const queryFilter = filtredTodos.filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={handleTodoFilter}
                filter={filter}
                query={query}
                onInputQuery={handleInputQuery}
                onClear={handleClearInput}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {errorMessage && (
                <p className="has-text-danger">{errorMessage}</p>
              )}
              <TodoList
                todos={queryFilter}
                onOpen={handleOpenModal}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {isShowModal && (
        <TodoModal user={currentUser} todo={checkedTodo} onClose={closeModal} />
      )}
    </>
  );
};
