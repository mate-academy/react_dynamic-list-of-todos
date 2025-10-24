import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

const FILTRATIONS: Record<FilterStatus, (todo: Todo) => boolean> = {
  [FilterStatus.All]: () => true,
  [FilterStatus.Active]: (todo: Todo) => !todo.completed,
  [FilterStatus.Completed]: (todo: Todo) => todo.completed,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>(
    FilterStatus.All,
  );

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();

        setTodos(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    const normalized = searchQuery.toLowerCase().trim();

    return todos
      .filter(FILTRATIONS[selectedFilter])
      .filter(todo => todo.title.toLowerCase().includes(normalized));
  }, [todos, searchQuery, selectedFilter]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleQueryReset = () => {
    setSearchQuery('');
  };

  const handleSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as FilterStatus);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <section className="section">
        <div className="container box">
          <h1 className="title">Todos:</h1>

          <TodoFilter
            searchQuery={searchQuery}
            handleQueryChange={handleQueryChange}
            handleQueryReset={handleQueryReset}
            selectedFilter={selectedFilter}
            handleSelectFilter={handleSelectFilter}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <TodoList
              todos={filteredTodos}
              selectedTodo={selectedTodo}
              handleSelectTodo={handleSelectTodo}
            />
          )}
        </div>
      </section>

      {isModalOpened && selectedTodo && (
        <TodoModal
          handleModalClose={handleModalClose}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
