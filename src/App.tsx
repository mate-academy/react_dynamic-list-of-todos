/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
// import { TodoModal } from './components/TodoModal';

const initialTodo: Todo = {
  userId: 0,
  id: 0,
  title: '',
  completed: false,
};

function getVisibleTodos(
  todos: Todo[],
  {
    queryBy,
    filterBy,
  }: {
    queryBy: string;
    filterBy: string;
  },
) {
  const handledTodos = [...todos];

  if (queryBy) {
    handledTodos.filter(todo => todo.title.includes(queryBy));
  }

  if (filterBy === 'active') {
    handledTodos.filter(todo => todo.completed);
  }

  if (filterBy === 'completed') {
    handledTodos.filter(todo => !todo.completed);
  }

  return handledTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([initialTodo]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  // const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleTodos = getVisibleTodos(todos, { query, filter });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterQuery => {
                  setFilter(filterQuery);
                }}
                sortBy={newQuery => {
                  setQuery(newQuery);
                }}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && <TodoList visibleTodos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
