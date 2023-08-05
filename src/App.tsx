/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './enum/Status';

const getFilteredTodos = (
  todos: Todo[],
  query: string,
  filterBy: Status,
) => {
  let filteredTodos = [...todos];

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(preparedQuery));
  }

  switch (filterBy) {
    case Status.ALL:
      return filteredTodos;
    case Status.ACTIVE:
      return filteredTodos.filter(todo => !todo.completed);
    case Status.COMPLETED:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pickedTodo, setPickedTodo] = useState<Todo>(todos[0]);
  const [filterBy, setFilterBy] = useState<Status>(Status.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, query, filterBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredBy={setFilterBy}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  setShowModal={setShowModal}
                  setPickedTodo={setPickedTodo}
                  pickedTodo={pickedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <TodoModal
          setShowModal={setShowModal}
          pickedTodo={pickedTodo}
        />
      )}
    </>
  );
};
