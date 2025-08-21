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

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [query, setQuery] = useState('');
  const [chosenSelectItem, setChosenSelectItem] = useState('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Loading todos failed!'))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearInputQuery = () => {
    setQuery('');
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenSelectItem(event.target.value);
  };

  const selectTodo = (todo: Todo) => {
    if (todo) {
      setSelectedTodo(todo);
      setIsModalWindowOpened(true);
    }
  };

  const unselectTodo = () => {
    setSelectedTodo(null);
    setIsModalWindowOpened(false);
  };

  const getPreparedTodos = (
    theTodos: Todo[],
    theQuery: string,
    theChosenSelectItem: string,
  ): Todo[] => {
    let preparedTodos = [...theTodos];

    if (theQuery.trim() !== '') {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(theQuery.toLowerCase().trim()),
      );
    }

    if (theChosenSelectItem === 'completed') {
      preparedTodos = preparedTodos.filter(todo => todo.completed);
    }

    if (theChosenSelectItem === 'active') {
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
    }

    return preparedTodos;
  };

  const preparedTodos = getPreparedTodos(todos, query, chosenSelectItem);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleFilterInput={handleFilterInput}
                clearInputQuery={clearInputQuery}
                chosenSelectItem={chosenSelectItem}
                handleOnSelect={handleOnSelect}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={selectTodo}
                />
              )}
              {errorMessage !== '' && <p role="alert">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      {isModalWindowOpened && (
        <TodoModal selectedTodo={selectedTodo} unselectTodo={unselectTodo} />
      )}
    </>
  );
};
