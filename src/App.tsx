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

  const [query, setQuery] = useState('');
  const [activeTodoId, setActiveTodoId] = useState(0);

  const activeTodo = todos.find(todo => todo.id === activeTodoId);

  const getTodosList = useCallback(async (promise: Promise<Todo[]>) => {
    try {
      setTodos(await promise);
    } catch {
      setIsError(true);
    }
  }, []);

  let VisibleTodos = todos;

  switch (sortType) {
    case SortType.Active:
      VisibleTodos = VisibleTodos.filter(todo => !todo.completed);
      break;

    case SortType.Completed:
      VisibleTodos = VisibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  VisibleTodos = VisibleTodos
    .filter(todo => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()));

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
              {(!todos.length || isError) ? (
                <Loader />
              ) : (
                <TodoList
                  todos={VisibleTodos}
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
