import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      selectedFilter === FilterStatus.All ||
      (selectedFilter === FilterStatus.Active && !todo.completed) ||
      (selectedFilter === FilterStatus.Completed && todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const onSelectTodo = (todo: Todo) => {
    if (selectedTodo && selectedTodo.id === todo.id) {
      setSelectedTodo(null);
    } else {
      setSelectedTodo(todo);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={event => setQuery(event.target.value)}
                onQueryReset={() => setQuery('')}
                selectedFilter={selectedFilter}
                onSelectFilter={event =>
                  setSelectedFilter(event.target.value as FilterStatus)
                }
              />
            </div>

            <div className="block">
              {loading ? <Loader /> : null}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo || undefined}
                onSelectTodo={onSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
