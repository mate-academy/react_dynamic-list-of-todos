import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterOption } from './types/FilterOption';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');

  const filterOptions: FilterOption[] = useMemo(
    () => ['all', 'active', 'completed'],
    [],
  );

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    let newTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(lowerQuery),
    );

    switch (selectedFilter) {
      case 'active':
        newTodos = newTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        newTodos = newTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return newTodos;
  }, [query, todos, selectedFilter]);

  const handleQueryChange = (value: string) => setQuery(value);
  const handleFilterSelect = (value: FilterOption) => setSelectedFilter(value);
  const selectTodo = (todo: Todo) => setSelectedTodo(todo);
  const unselectTodo = () => setSelectedTodo(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={handleQueryChange}
                options={filterOptions}
                selectedOption={selectedFilter}
                onSelect={handleFilterSelect}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={unselectTodo} />}
    </>
  );
};
