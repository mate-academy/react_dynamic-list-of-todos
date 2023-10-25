/* eslint-disable no-console */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useCallback, useEffect, useState } from 'react';

import { getTodos } from './api';
import { FilterOption, TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

import { debounce } from './_utils/debounce_generic';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [currentFilterOption, setFilterOption]
    = useState<FilterOption>(FilterOption.All);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadTodos = async () => {
    setLoading(true);

    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
      setFilteredTodos(loadedTodos);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const updateFilteredTodos = useCallback(
    (term: string, filterOption: FilterOption) => {
      let updatedTodos = [...todos];

      if (term.trim()) {
        updatedTodos = updatedTodos.filter(
          todo => todo.title.toLowerCase().includes(term.toLowerCase()),
        );
      }

      switch (filterOption) {
        case FilterOption.Active:
          updatedTodos = updatedTodos.filter(todo => !todo.completed);
          break;
        case FilterOption.Completed:
          updatedTodos = updatedTodos.filter(todo => todo.completed);
          break;
        default:
          break;
      }

      setFilteredTodos(updatedTodos);
    }, [todos],
  );

  const handleSearch = useCallback((term: string) => {
    setSearchQuery(term);

    const debouncedUpdate = debounce(() => {
      updateFilteredTodos(term, currentFilterOption);
    }, 600);

    debouncedUpdate();
  }, [currentFilterOption, updateFilteredTodos]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = event.target.value as FilterOption;

    setFilterOption(newSortOption);
    updateFilteredTodos(searchQuery, newSortOption);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setFilteredTodos(todos);
  };

  const handleTodoSelect = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  // console.log(todos, 'normal');
  // console.log(filteredTodos, 'filtered');
  // console.log(selectedTodo, 'selected todo');
  // console.log('isTodoModalVisible', isTodoModalVisibile);
  console.log('current filter option', currentFilterOption);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={handleSearch}
                onResetSearch={handleResetSearch}
                searchQuery={searchQuery}
                sortOptionChange={handleSortChange}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              <TodoList
                todos={filteredTodos}
                onTodoSelect={handleTodoSelect}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onTodoSelect={handleTodoSelect}
        />
      )}
    </>
  );
};
