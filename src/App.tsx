/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { SortType, TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

const todosFromServer = getTodos().then((todos: Todo[]) => todos);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [openTodo, setOpenTodo] = useState<Todo | null>(null);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [currentSelectedFilter, setCurrentSelectedFilter] = useState(
    SortType.All,
  );
  const [currentQuery, setCurrentQuery] = useState('');

  const onSelectedFilter = (filter: SortType) => {
    setCurrentSelectedFilter(filter);
  };

  const onQuery = (query: string) => {
    setCurrentQuery(query);
  };

  const TodoOpen = {
    openTodo,
    setTodo: setOpenTodo,
  };

  useEffect(() => {
    setLoading(true);
    todosFromServer.then(todos => {
      switch (currentSelectedFilter) {
        case SortType.Active:
          setCurrentTodos(todos.filter(todo => !todo.completed));
          break;
        case SortType.Completed:
          setCurrentTodos(todos.filter(todo => todo.completed));
          break;
        default:
          setCurrentTodos(todos);
          break;
      }

      if (currentQuery) {
        setCurrentTodos(todosCurrent =>
          todosCurrent.filter(todo =>
            todo.title.toLowerCase().includes(currentQuery),
          ),
        );
      }

      setLoading(false);
    });
  }, [currentSelectedFilter, currentQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectedFilter={onSelectedFilter}
                onQuery={onQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList visibleTodos={currentTodos} todoOpen={TodoOpen} />
              )}
            </div>
          </div>
        </div>
      </div>
      {!loading && openTodo && (
        // <TodoModal openTodo={openTodo} setTodo={setOpenTodo} />
        <TodoModal todoOpen={TodoOpen} />
      )}
    </>
  );
};
