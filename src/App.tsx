import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/FIlter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed
        && todo.title.toLowerCase().includes(query.toLowerCase());
      case Filter.Completed:
        return todo.completed
        && todo.title.toLowerCase().includes(query.toLowerCase());
      case Filter.All:
      default:
        return todo.title.toLowerCase().includes(query.toLowerCase());
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                updateFilter={(newFilter) => setFilter(newFilter)}
                updateQuery={(newQuery) => setQuery(newQuery)}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  modal={modal}
                  updateModal={(newTodo) => setModal(newTodo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
          modal={modal}
          deleteModal={() => setModal(null)}
        />
      )}
    </>
  );
};
