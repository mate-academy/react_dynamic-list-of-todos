/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export type Filter = {
  status: string;
  query: string;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<Filter>({ status: 'all', query: '' });
  const [currentTodo, setCurrentTodo] = useState<Todo>();

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const normalizedQuery = query.query.trim().toLowerCase();
  const normalizedStatus = query.status.toLowerCase();

  const filteredTodos = useMemo(() => {
    let fltrdTodos: Todo[] | undefined = todos;

    switch (normalizedStatus) {
      case 'all':
        fltrdTodos = todos;
        break;
      case 'active':
        fltrdTodos = todos?.filter(todo => todo.completed === false);
        break;
      case 'completed':
        fltrdTodos = todos?.filter(todo => todo.completed === true);
        break;
    }

    if (normalizedQuery) {
      fltrdTodos = fltrdTodos?.filter(todo =>
        todo.title.trim().toLowerCase().includes(normalizedQuery),
      );
    }

    return fltrdTodos;
  }, [normalizedStatus, normalizedQuery, todos]);

  const addTodo = (newTodo: Todo) => {
    setCurrentTodo(newTodo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onChange={(filter: Filter) => setQuery(filter)} />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                currentTodo={currentTodo}
                addTodo={addTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          onClick={() => setCurrentTodo(undefined)}
        />
      )}
    </>
  );
};
