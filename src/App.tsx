import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './components/enums/Status';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

function filterTodos(todos: Todo[], filter: Status, query: string) {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filter) {
    case Status.active:
      return filteredTodos.filter(todo => !todo.completed);

    case Status.complete:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.all);
  const [query, setQuery] = useState('');
  const [openedTodo, setOpenedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  const visibleTodos = filterTodos(todosFromServer, filter, query);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setLoading(false));
  }, []);

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
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setOpenedTodo={setOpenedTodo}
                  openedTodo={openedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {openedTodo && (
        <TodoModal todo={openedTodo} setOpenedTodo={setOpenedTodo} />
      )}
    </>
  );
};
