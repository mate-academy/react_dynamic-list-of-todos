/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { filterTodos } from './Helpers/FilterTodos';
import { getErrorMessage } from './Helpers/GetErrorMessage';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const visibleTodos = filterTodos(todosList, filterType, searchValue);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);

      const todos = await getTodos();

      setTodosList(todos);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const checkVisibleTodosLength = (visibleTodosLength: number) => {
    if (visibleTodosLength) {
      return (
        <TodoList
          todos={visibleTodos}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      );
    }

    return <p>{errorMessage}</p>;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={searchValue}
                setFilterType={setFilterType}
                setSearchValue={setSearchValue}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : checkVisibleTodosLength(visibleTodos.length)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
