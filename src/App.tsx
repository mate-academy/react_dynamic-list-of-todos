/* eslint-disable @typescript-eslint/no-shadow */
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

type FilterOption = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todosFromServer: Todo[]) => {
        setTodos(todosFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterOption);
  };

  const resetQuery = () => {
    setQuery('');
  };

  const resetSelectedTodo = () => {
    setSelectedTodoId(null);
  };

  const handleSelectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const ifMatchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const ifMatchesFilter =
        filter === 'all' ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'active' && !todo.completed);

      return ifMatchesFilter && ifMatchesQuery;
    });
  }, [query, filter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChange}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelected={handleSelectTodoId}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onReset={resetSelectedTodo} />
      )}
    </>
  );
};
