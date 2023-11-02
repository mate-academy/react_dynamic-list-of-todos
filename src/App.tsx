/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api/api';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Selected } from './types/Selected';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then((todosData) => {
        setTodos(todosData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (selectedOption) {
        case Selected.Active:
          return !todo.completed;

        case Selected.Completed:
          return todo.completed;

        default:
          return true;
      }
    })
      .filter(todo => {
        const preparedQuery = query.toLowerCase();

        return todo.title.toLocaleLowerCase().includes(preparedQuery);
      })
  ), [query, selectedOption, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          {error ? (
            <p>{error}</p>
          ) : (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
                  query={query}
                  onInput={setQuery}
                />
              </div>

              <div className="block">
                {loader && !modal && <Loader />}
                {!loader && todos.length > 0 && (
                  <TodoList
                    todos={filteredTodos}
                    setModal={setModal}
                    id={id}
                    setId={setId}
                    setLoader={setLoader}
                    setUserId={setUserId}
                  />
                )}
              </div>
            </div>
          )}

        </div>
      </div>
      {modal && (
        <TodoModal
          todos={filteredTodos}
          setModal={setModal}
          id={id}
          setId={setId}
          loader={loader}
          setLoader={setLoader}
          userId={userId}
          onError={setError}
        />
      )}
    </>
  );
};
