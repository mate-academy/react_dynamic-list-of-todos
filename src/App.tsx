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
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState<Todo | undefined>();
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtredList = todos
    ?.filter(item => {
      if (filter === 'active') {
        return !item.completed;
      }

      if (filter === 'completed') {
        return item.completed;
      }

      return true;
    })
    .filter(item =>
      item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );

  useEffect(() => {
    getTodos()
      .then(json => {
        setTodos(json);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilter={setFilter} setQuery={setQuery} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filtredList}
                  isModalShowed={isModalShowed}
                  setTodo={setTodo}
                  setIsModalShowed={setIsModalShowed}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShowed && (
        <TodoModal todo={todo} setIsModalShowed={setIsModalShowed} />
      )}
    </>
  );
};
