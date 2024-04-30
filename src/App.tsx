/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter, FilterType } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelecetedTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [error, setError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError(true));
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (filterType === 'active') {
      filtered = todos.filter(todo => !todo.completed);
    } else if (filterType === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, filterType, query]);

  const selectedTodo = useMemo(() => {
    if (selectedTodoId && filteredTodos) {
      return filteredTodos.find(todo => todo.id === selectedTodoId);
    }

    return null;
  }, [selectedTodoId, filteredTodos]);

  const handleSelectTodo = (id: number | null) => setSelecetedTodoId(id);

  const handleModalClose = () => setSelecetedTodoId(null);

  const handleQuery = (input: string) => setQuery(input);

  const handleFilterType = (type: FilterType) => setFilterType(type);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={handleQuery}
                onFilterChange={handleFilterType}
              />
            </div>

            <div className="block">
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodoId}
                onSelect={handleSelectTodo}
              />
              {filteredTodos && <Loader />}
              {error && <p>Error!</p>}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
