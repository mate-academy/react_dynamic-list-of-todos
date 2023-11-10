/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';
import { TodoModal } from './components/TodoModal';

function filterTodos(todos: Todo[], filteredType: Filter, query: string) {
  let todoCopy = [...todos];

  if (query) {
    todoCopy = todoCopy.filter(todo => todo.title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  switch (filteredType) {
    case Filter.Active:
      return todoCopy.filter(todo => !todo.completed);

    case Filter.Completed:
      return todoCopy.filter(todo => todo.completed);

    default:
      return todoCopy;
  }
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(todo => setTodos(todo)).finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter, query);
  }, [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
