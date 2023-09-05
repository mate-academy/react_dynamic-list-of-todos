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
import { ErrorModal } from './components/ErrorModal/ErrorModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage('Request timed out');
      setIsLoading(false);
    }, 3000);

    getTodos()
      .then(todosData => {
        clearTimeout(timeoutId);
        setTodos(todosData);
        setIsLoading(false);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        setErrorMessage(`Error fetching todos data. ${error}`);
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseTitle = todo.title.toLowerCase();

    switch (filter) {
      case Filter.Active:
        return !todo.completed && lowerCaseTitle.includes(lowerCaseQuery);
      case Filter.Completed:
        return todo.completed && lowerCaseTitle.includes(lowerCaseQuery);
      case Filter.All:
      default:
        return lowerCaseTitle.includes(lowerCaseQuery);
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
                query={query}
                updateQuery={(newQuery) => setQuery(newQuery)}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  modal={modal}
                  updateModal={setModal}
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
          updateErrorMessage={(error: string) => setErrorMessage(error)}
        />
      )}

      {errorMessage && <ErrorModal message={errorMessage} />}
    </>
  );
};
