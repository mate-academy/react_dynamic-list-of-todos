/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { filterTodos } from './components/Helpers/FilterTodos';
import { getErrorMessage } from './components/Helpers/GetErrorMessage';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const visibleTodos = filterTodos(todosList, sortBy, searchValue);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();

      setTodosList(todos);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={searchValue}
                setSortBy={setSortBy}
                setSearchValue={setSearchValue}
              />
            </div>

            <div className="block">
              {isLoaded ? (
                <Loader />
              ) : (
                <>
                  {visibleTodos.length
                    ? (
                      <TodoList
                        todos={visibleTodos}
                        selectedTodo={selectedTodo}
                        setSelectedTodo={setSelectedTodo}
                      />
                    )
                    : <p>{errorMessage}</p>}
                </>
              )}
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
