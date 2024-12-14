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
import { FILTER_BY } from './constants';

function getFilterTodos(todos: Todo[], query: string, filterBy: string) {
  let copy = [...todos];

  if (query) {
    const lowQuery = query.toLowerCase();

    copy = copy.filter(elem => elem.title.toLowerCase().includes(lowQuery));
  }

  switch (filterBy) {
    case FILTER_BY.ACTIVE:
      return copy.filter(elem => !elem.completed);
    case FILTER_BY.COMPLETED:
      return copy.filter(elem => elem.completed);
    default:
      return copy;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<string>(FILTER_BY.ALL);
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [currentIcon, setCurrentIcon] = useState<HTMLElement | null>(null);

  const filteredTodos = getFilterTodos(todos, query, filterBy);

  const closeModal = () => {
    setTodo(null);
    currentIcon?.classList.replace('fa-eye-slash', 'fa-eye');
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onQuery={setQuery} onFilter={setFilterBy} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onTodo={setTodo}
                  onCurrentIcon={setCurrentIcon}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} onClose={closeModal} />}
    </>
  );
};
