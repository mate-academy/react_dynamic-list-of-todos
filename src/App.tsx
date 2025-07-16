/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  const [select, setSelect] = useState('all');
  const [query, setQuery] = useState('');

  const [isLoader, setIsLoader] = useState(false);
  const [isModalLoader, setIsModalLoader] = useState(false);

  const visibleTodos = useMemo(() => {
    let filterTodos = todos;

    if (select !== 'all') {
      filterTodos = filterTodos.filter(todo =>
        select === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (query) {
      filterTodos = filterTodos.filter(todo =>
        todo.title.toLowerCase().includes(query),
      );
    }

    return filterTodos;
  }, [todos, query, select]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectTodo(todo);
    setIsModalLoader(true);

    getUser(todo.userId)
      .then(setSelectUser)
      .finally(() => setIsModalLoader(false));
  };

  const closeModal = () => {
    setSelectUser(null);
    setSelectTodo(null);
  };

  useEffect(() => {
    setIsLoader(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getSelect={setSelect}
                getQuery={setQuery}
                select={select}
              />
            </div>

            <div className="block">
              {isLoader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={handleTodoSelect}
                  todoId={selectTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          closeModal={closeModal}
          todo={selectTodo}
          user={selectUser}
          isLoader={isModalLoader}
        />
      )}
    </>
  );
};
