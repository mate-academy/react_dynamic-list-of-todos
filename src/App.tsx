/* eslint-disable max-len */
import React, { useMemo, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './getTodos';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [filter, setFilter] = useState({ filteredBy: 'all', query: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [chosenTodo, setChosenTodo] = useState<Todo>({} as Todo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data) => setTodos(data))
      .catch((e) => setErrorMessage(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const filteredByTodos = todos.length ? todos.filter((todo) => {
      const { completed } = todo;
      const { filteredBy } = filter;

      switch (filteredBy) {
        case 'all':
          return true;
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return true;
      }
    })
      : [];

    const { query } = filter;

    const filteredByQueryTodos = query
      ? filteredByTodos.filter((todo) => todo.title
        .toLowerCase().includes(query.toLowerCase())) : filteredByTodos;

    return filteredByQueryTodos;
  }, [filter.filteredBy, filter.query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={setFilter} />
            </div>
            {isLoading && !errorMessage && <Loader />}

            {!isLoading && (
              <div className="block">
                <TodoList
                  chosenTodo={chosenTodo}
                  setIsModalLoading={setIsModalLoading}
                  todos={filteredTodos}
                  setChosenTodo={setChosenTodo}
                />
              </div>
            )}

            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>

      {Object.keys(chosenTodo).length
      && <TodoModal isLoading={isModalLoading} setIsLoading={setIsModalLoading} setTodo={setChosenTodo} todo={chosenTodo} />}
    </>
  );
};
