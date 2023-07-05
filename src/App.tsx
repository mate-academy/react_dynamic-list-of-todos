/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { StatusFilter } from './types/StatusFilter';
import { filterTodos } from './helpers';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(StatusFilter.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(response => {
        if ('Error' in response) {
          setIsErrorMessage(true);
        } else {
          setTodosFromServer(response);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => filterTodos(
    todosFromServer,
    selectedFilter,
    searchQuery,
  ), [selectedFilter, todosFromServer, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {isErrorMessage ? (
              <div className="has-text-danger">
                Unable to load the todos
              </div>

            ) : (
              <div className="block">
                {isLoading
                  ? (
                    <Loader />
                  ) : (
                    <TodoList
                      todos={visibleTodos}
                      setSelectedTodo={setSelectedTodo}
                      selectedTodo={selectedTodo}
                    />
                  )}

              </div>
            )}

          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
