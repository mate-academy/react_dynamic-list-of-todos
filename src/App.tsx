/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Method } from './types/Method';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';

function filterTodos(
  todos: Todo[],
  filterMethod: string,
  query: string,
): Todo[] {
  let result: Todo[] = todos;

  if (query) {
    result = todos
      .filter(todo => todo.title
        .toLowerCase()
        .includes(query.toLowerCase()));
  }

  if (filterMethod === Method.active) {
    (result = result.filter(todo => !todo.completed));
  }

  if (filterMethod === Method.completed) {
    (result = result.filter(todo => todo.completed));
  }

  return result;
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filterMethod, setFilterMethod] = useState<string>('');
  const [query, setQuery] = useState('');

  const filteredTodos: Todo[] = useMemo(() => {
    return filterTodos(todos, filterMethod, query);
  }, [todos, query, filterMethod]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <h1 className="title">Todos:</h1>

        <div className="block">
          <TodoFilter
            setFilterMethod={setFilterMethod}
            query={query}
            setQuery={setQuery}
          />
        </div>

        <div className="block">
          {isLoading
            ? (<Loader />)
            : (
              <TodoList
                todos={filteredTodos}
                activeTodo={activeTodo}
                setActiveTodo={setActiveTodo}
              />
            )}
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      )}
    </>
  );
};
