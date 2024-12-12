/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterOptions } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSlash, setIconSlash] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const toggleModal = useCallback(
    (todo?: Todo) => {
      setIsModalVisible(!showModal);
      setSelectedTodo(todo || null);

      if (selectedTodo) {
        setIconSlash(currentState => ({
          ...currentState,
          [selectedTodo.id]: false,
        }));
      }
    },
    [showModal, selectedTodo],
  );

  const handleFilterChange = useCallback((newFilter: FilterOptions) => {
    setFilter(newFilter);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleIconToggle = useCallback((todoId: number) => {
    setIconSlash(currentState => ({
      ...currentState,
      [todoId]: !currentState[todoId],
    }));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const itemsFilter =
        filter === FilterOptions.All ||
        (filter === FilterOptions.Active && !todo.completed) ||
        (filter === FilterOptions.Completed && todo.completed);

      const itemsSearchQuery = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return itemsFilter && itemsSearchQuery;
    });
  }, [todos, filter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                onClose={handleSearchClear}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos && (
                <TodoList
                  todos={filteredTodos}
                  onClicked={toggleModal}
                  iconState={iconSlash}
                  onToggleIcon={handleIconToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && <TodoModal todo={selectedTodo} onClose={toggleModal} />}
    </>
  );
};
