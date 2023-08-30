/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

//  components
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { ErrorBlock } from './components/ErrorBlock';

//  types
import { Todo } from './types/Todo';
import { FILTER } from './types/FILTER';
import { User } from './types/User';

//  other
import { filterTodos } from './functions/filterTodos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userId, setUserId] = useState<User['id']>(0);

  const [filterQuery, setFilterQuery] = useState<FILTER>(FILTER.ALL);
  const [queryInput, setQueryInput] = useState<string>('');

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadData = useCallback(() => {
    setIsloading(true);
    setErrorMessage('');

    getTodos()
      .then(todosJSON => setTodos(todosJSON))
      .catch(error => setErrorMessage(error.message))
      .finally(() => setIsloading(false));
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (todos.length !== 0) {
      setFilteredTodos(filterTodos(filterQuery, queryInput, todos));
    }
  }, [filterQuery, queryInput, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
                queryInput={queryInput}
                setQueryInput={setQueryInput}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && errorMessage.length === 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo as Todo}
                  setSelectedTodo={setSelectedTodo}
                  setUserId={setUserId}
                />
              )}
              {!isLoading && errorMessage.length !== 0 && <ErrorBlock loadData={loadData} errorMessage={errorMessage} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          userId={userId as User['id']}
          setUserId={setUserId}
        />
      )}
    </>
  );
};
