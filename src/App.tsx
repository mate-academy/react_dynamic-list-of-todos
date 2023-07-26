/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

function getPreparedTodos(
  todoList: Todo[],
  filter: string,
  query: string,
) {
  let preparedTodos = [...todoList];

  if (query) {
    preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(query.trim().toLowerCase()));
  }

  if (filter !== 'all') {
    switch (filter) {
      case 'all':
        preparedTodos = [...todoList];
        break;

      case 'active':
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;

      default:
        throw new Error('Error');
    }
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = getPreparedTodos(
    todos,
    filter,
    query,
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList
                todos={filteredTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
