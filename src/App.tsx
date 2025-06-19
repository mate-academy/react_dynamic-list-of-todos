import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

function getTodos() {
  return fetch(BASE_URL + 'todos.json').then(respons => {
    if (respons.ok) {
      return respons.json();
    }

    throw new Error(`Failed to load data from ${BASE_URL}todos.json`);
  });
}

function getUsers() {
  return fetch(BASE_URL + 'users.json').then(respons => {
    if (respons.ok) {
      return respons.json();
    }

    throw new Error(`Failed to load data from ${BASE_URL}users.json`);
  });
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const [selectFilter, setSelectFilter] = useState('all');
  const [selectId, setSelectId] = useState<number | null>(null);
  const [selectUserId, setSelectUserId] = useState<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => alert(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(error => alert(error.message))
      .finally(() => {
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
                title={title}
                setTitle={setTitle}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos
                  .filter((todo: Todo) =>
                    selectFilter === 'all'
                      ? todo
                      : selectFilter === 'active'
                        ? todo.completed === false
                        : todo.completed === true,
                  )
                  .filter((todo: Todo) =>
                    title === '' ? todo : todo.title.includes(title),
                  )}
                setIsModalOpen={setIsModalOpen}
                setSelectId={setSelectId}
                setSelectUserId={setSelectUserId}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectId && selectUserId && (
        <TodoModal
          isLoading={isLoading}
          setIsModalOpen={setIsModalOpen}
          selectTodo={todos.filter(todo => todo.id === selectId)}
          selectUser={users.filter(user => user.id === selectUserId)}
        />
      )}
    </>
  );
};
