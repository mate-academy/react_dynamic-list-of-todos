/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTodoId, setActiveTodoId] = useState(0);

  const activeTodo = todos.find(todo => todo.id === activeTodoId);

  const getTodosList = async (promise: Promise<Todo[]>) => {
    try {
      setTodos(await promise);
    } catch {
      setHasError(true);
    }
  };

  useEffect(() => {
    getTodosList(getTodos());
  }, []);

  let visibleTodos: Todo[] = [...todos];

  if (filterType === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (filterType === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  visibleTodos = visibleTodos
    .filter(todo => todo.title.toLowerCase()
      .includes(query.trim().toLowerCase()));

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
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {(!todos.length || hasError) ? (
                <Loader />
              ) : (
                visibleTodos.length === 0 ? (
                  <article className="message is-warning">
                    <div className="message-header">
                      <p>Warning</p>
                    </div>

                    <div className="message-body">
                      Warning: No users found!
                    </div>
                  </article>
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    activeTodoId={activeTodoId}
                    setActiveTodoId={setActiveTodoId}
                  />
                )
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
