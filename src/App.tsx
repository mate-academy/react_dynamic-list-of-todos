import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortType } from './types/sortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [sortType, setSortType] = useState(SortType.All);
  const [isLoading, setIsLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [activeTodoId, setActiveTodoId] = useState(0);

  const activeTodo = todos.find(todo => todo.id === activeTodoId);

  const getTodosList = useCallback(async (promise: Promise<Todo[]>) => {
    try {
      setTodos(await promise);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  let visibleTodos = todos;

  switch (sortType) {
    case SortType.Active:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case SortType.Completed:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  visibleTodos = visibleTodos
    .filter(todo => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()));

  const errorTodoList = todos.length > 0 && !isError && !isLoading;

  useEffect(() => {
    getTodosList(getTodos());
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setTodos={setTodos}
                query={query}
                setQuery={setQuery}
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              {isLoading && !isError && (
                <Loader />
              )}

              {isError && !isLoading && (
                <p>Unable to load todos</p>
              )}

              {errorTodoList && (
                <TodoList
                  todos={visibleTodos}
                  activeTodoId={activeTodoId}
                  setActiveTodoId={setActiveTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          setActiveTodoId={setActiveTodoId}
        />
      )}
    </>
  );
};
