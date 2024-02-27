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
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [todoInfo, setTodoInfo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  let visibleTodos = todos;

  switch (filter) {
    case 'active':
      visibleTodos = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      visibleTodos = todos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (search) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  todoInfo={todoInfo}
                  setTodoInfo={setTodoInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoInfo && <TodoModal todoInfo={todoInfo} setTodoInfo={setTodoInfo} />}
    </>
  );
};
