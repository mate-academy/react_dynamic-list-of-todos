/* eslint-disable max-len */
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { filterTodos } from './helpers/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleSelectTodosByFilter = (value: string) => {
    setFilterType(value);
  };

  const handleSearchQuery = (event: React.SetStateAction<string>) => {
    setSearchQuery(event);
  };

  const onSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);

    setIsModalOpen(true);
  }, []);

  const loadTodos = async () => {
    setIsFetching(true);
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);

    setIsFetching(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(
    () => filterTodos(
      todos,
      filterType,
      searchQuery,
    ), [todos, filterType, searchQuery],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                handleSelectTodosByFilter={handleSelectTodosByFilter}
                searchQuery={searchQuery}
                handleSearchQuery={handleSearchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {isFetching
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    onSelectTodo={onSelectTodo}
                    isModalOpen={isModalOpen}
                    selectedTodo={selectedTodo}
                  />
                </div>
              )}

          </div>
        </div>
      </div>

      {selectedTodo && isModalOpen
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onCloseModal={onCloseModal}
          />
        )}
    </>
  );
};
