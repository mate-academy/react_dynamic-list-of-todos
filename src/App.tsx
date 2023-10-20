/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

import { Loader } from './components/Loader';
import { debounce } from './_utils/debounce_generic';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTodoModalVisibile, setTodoModalVisibility] = useState(false);

  const loadTodos = async () => {
    setLoading(true);

    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleFilter = useCallback((term: string) => {
    setSearchQuery(term);
    if (term.trim() === '') {
      setFilteredTodos(todos);

      return;
    }

    const debouncedFilter = debounce((debouncedTerm: string) => {
      const newFilteredTodos = todos.filter(
        todo => todo.title.includes(debouncedTerm),
      );

      setFilteredTodos(newFilteredTodos);
    }, 600);

    debouncedFilter(term);
  }, [todos]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleResetSearch = () => {
    setSearchQuery('');
    setFilteredTodos(todos);
  };

  const handleTodoModalVisibility = () => {
    setTodoModalVisibility(!isTodoModalVisibile);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    handleTodoModalVisibility();
  };

  // console.log(todos, 'normal');
  // console.log(filteredTodos, 'filtered');
  console.log(selectedTodo, 'selected todo');
  console.log('isTodoModalVisible', isTodoModalVisibile);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={handleFilter}
                onResetSearch={handleResetSearch}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              <TodoList
                todos={filteredTodos}
                onTodoSelect={handleTodoSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {isTodoModalVisibile && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onVisible={handleTodoModalVisibility}
        />
      )}
    </>
  );
};
