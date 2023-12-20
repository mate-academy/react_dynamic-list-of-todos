/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum Select {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filterTodos(todos: Todo[], query: string, statusSelector: Select) {
  let toRenderTodos: Todo[] = [...todos];

  if (query) {
    toRenderTodos = toRenderTodos.filter(todo => (todo.title.toLowerCase().includes(query.toLowerCase())));
  }

  switch (statusSelector) {
    case Select.Active:
      return toRenderTodos.filter(todo => !todo.completed);
    case Select.Completed:
      return toRenderTodos.filter(todo => todo.completed);
    default:
      return toRenderTodos;
  }
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTodoUserId, setActiveTodoUserId] = useState<number | null>(null);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<Select>(Select.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const renderTodos = filterTodos(todos, query, filterBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setFilterBy={setFilterBy}
                query={query}
                filterBy={filterBy}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    renderTodos={renderTodos}
                    activeTodo={activeTodo}
                    setActiveTodo={setActiveTodo}
                    setActiveTodoUserId={setActiveTodoUserId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo && (
        <TodoModal
          setActiveTodo={setActiveTodo}
          activeTodo={activeTodo}
          activeTodoUserId={activeTodoUserId}
        />
      )}
    </>
  );
};
