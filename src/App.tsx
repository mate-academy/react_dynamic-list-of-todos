/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useDebounce } from './hooks/useDebounce';
import { filteredTodos } from './utils';
import { useFetch } from './hooks/useFetch';

export type FilterStatus = 'all' | 'active' | 'completed';
export type TodoFiltersState = {
  status: FilterStatus;
  search: string;
};

export const App: React.FC = () => {
  const { data: todos, loading } = useFetch<Todo[]>({
    fun: getTodos,
  });

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [filter, setFilter] = useState<TodoFiltersState>({
    status: 'all',
    search: '',
  });
  const debounceSearch = useDebounce(filter.search);
  const visibleTodos = filteredTodos(todos, {
    status: filter.status,
    search: debounceSearch,
  });

  const handleFilterChange = useCallback(
    <T extends keyof TodoFiltersState>(key: T, value: TodoFiltersState[T]) => {
      setFilter(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onChangeFilter={handleFilterChange} value={filter} />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelectedTodo={setSelectedTodo}
                open={openModal}
                onOpenModal={setOpenModal}
              />
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <TodoModal selectedTodo={selectedTodo} onOpen={setOpenModal} />
      )}
    </>
  );
};
