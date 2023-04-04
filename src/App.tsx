import React, { useCallback, useEffect, useState } from 'react';
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
  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');
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

  if (selectFilter === 'active') {
    VisibleTodos = VisibleTodos.filter(todo => !todo.completed);
  }

  if (selectFilter === 'completed') {
    VisibleTodos = VisibleTodos.filter(todo => todo.completed);
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
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
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
