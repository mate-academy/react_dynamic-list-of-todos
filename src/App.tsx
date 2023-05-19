import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { filteringBySearch, filteringBySelect } from './utils/todosFiltering';
import { SelectValues } from './types/SelectValues';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFilterValue,
    setSelectedFilterValue] = useState(SelectValues.All);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  const getActiveTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const todosAfterSelect = useMemo(() => {
    return filteringBySelect(todosFromServer, selectedFilterValue);
  }, [todosFromServer, selectedFilterValue]);

  const todosAfterSearch = useMemo(() => {
    return filteringBySearch(todosAfterSelect, searchValue);
  }, [searchValue, todosAfterSelect]);

  const closeDetails = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setIsLoaded(true);
      })
      .catch(errorMessage => setError(`smth happens - ${errorMessage}`))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilterValue={selectedFilterValue}
                setSelectedFilterValue={setSelectedFilterValue}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}
              <TodoList
                todos={todosAfterSearch}
                getActiveTodo={getActiveTodo}
                activeTodo={selectedTodo}
              />
            </div>
            {error && (
              <span style={{ color: 'red' }}>
                {error}
              </span>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeDetails={closeDetails}
        />
      )}
    </>
  );
};
