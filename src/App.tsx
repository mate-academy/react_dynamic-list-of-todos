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
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [idTodo, setIdTodo] = useState(0);
  const [titleTodo, setTitleTodo] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtredByQuery = (items: Todo[]) => {
    return items.filter(item => item.title.includes(query));
  };

  const filteredTodos = (items: Todo[]) => {
    if (filter === 'active') {
      const filtredItems = items.filter(item => !item.completed);

      return filtredByQuery(filtredItems);
    }

    if (filter === 'completed') {
      const filtredItems = items.filter(item => item.completed);

      return filtredByQuery(filtredItems);
    }

    return filtredByQuery(items);
  };

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  const onOpenModal = (
    value: boolean, todoId: number, userId: number, title: string,
  ) => {
    setIsOpenedModal(value);
    setIdTodo(todoId);
    setTitleTodo(title);

    getUser(userId).then(person => setUser(person));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetFilter={(filt: string) => setFilter(filt)}
                onChangeQuery={(q) => setQuery(q)}
              />
            </div>

            <div className="block">
              {!todos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos(todos)}
                  openModal={(
                    value: boolean,
                    todoId: number,
                    userId: number,
                    title: string,
                  ) => onOpenModal(value, todoId, userId, title)}
                  isOpenedModal={isOpenedModal}
                  idTodo={idTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpenedModal && (
        <TodoModal
          user={user}
          idTodo={idTodo}
          titleTodo={titleTodo}
          onRemoveModal={(value) => setIsOpenedModal(value)}
        />
      )}
    </>
  );
};
