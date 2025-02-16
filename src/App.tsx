/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);

  useEffect(() => {
    setIsLoaderActive(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoaderActive(false));
  }, []);

  const selectTodoHandler = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const closeModalHandler = () => {
    setCurrentTodo(null);
  };

  const selectStatusTodosHandler = (statusValue: Status) => {
    setFilterStatus(statusValue);
  };

  const filteredTodos = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return todos.filter(todo => {
      const filteredByQuery = todo.title.toLowerCase().includes(lowerCaseQuery);

      switch (filterStatus) {
        case Status.Active:
          return filteredByQuery && !todo.completed;
        case Status.Completed:
          return filteredByQuery && todo.completed;
        default:
          return filteredByQuery;
      }
    });
  }, [query, todos, filterStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={selectStatusTodosHandler}
                filtredQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoaderActive ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={selectTodoHandler}
                  selectedTodoId={currentTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal currentTodo={currentTodo} closeModal={closeModalHandler} />
      )}
    </>
  );
};
