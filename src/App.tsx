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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [queryToFilter, setQueryToFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  let visibleGoods = todos;

  switch (selectedStatus) {
    case 'completed':
      visibleGoods = visibleGoods.filter(todo => todo.completed === true);
      break;

    case 'active':
      visibleGoods = todos.filter(todo => todo.completed === false);
      break;

    default: visibleGoods = todos;
  }

  visibleGoods = visibleGoods.filter(todo => todo.title.toLocaleLowerCase()
    .includes(queryToFilter.toLocaleLowerCase()));

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const closeTodoModal = () => {
    setUserId(0);
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getQuery={(query) => setQueryToFilter(query)}
                getOption={(option) => setSelectedStatus(option)}
              />
            </div>

            <div className="block">
              {visibleGoods.length > 0 && todos.length > 0
                && (
                  <TodoList
                    todos={visibleGoods}
                    selectedTodo={selectedTodo}
                    setCurrentUserId={(newUserId) => setUserId(newUserId)}
                    setCurrentTodo={(todo) => setSelectedTodo(todo)}
                  />
                )}
              {visibleGoods.length === 0 && todos.length === 0 && <Loader />}
              {visibleGoods.length === 0 && todos.length > 0
                && (
                  <table className="table is-narrow is-fullwidth">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>
                          <span className="icon">
                            <i className="fas fa-check" />
                          </span>
                        </th>
                        <th>Title</th>
                        <th> </th>
                      </tr>
                    </thead>
                  </table>
                )}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0
        && (
          <TodoModal
            userId={userId}
            selectedTodo={selectedTodo}
            closeTodoModal={closeTodoModal}
          />
        )}
    </>
  );
};
