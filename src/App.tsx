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
  const [currentSortOption, setSortOption] = useState('all');
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

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const updateFilteredTodos = useCallback(
    (term: string, sortOption: string) => {
      let updatedTodos = todos;

      if (term.trim() !== '') {
        updatedTodos = updatedTodos.filter(todo => todo.title.includes(term));
      }

      switch (sortOption) {
        case 'active':
          updatedTodos = updatedTodos.filter(todo => !todo.completed);
          break;
        case 'completed':
          updatedTodos = updatedTodos.filter(todo => todo.completed);
          break;
        default:
          break;
      }

      setFilteredTodos(updatedTodos);
    }, [todos],
  );

  const handleFilter = useCallback((term: string) => {
    setSearchQuery(term);

    const debouncedUpdate = debounce(() => {
      updateFilteredTodos(term, currentSortOption);
    }, 600);

    debouncedUpdate();
  }, [currentSortOption, updateFilteredTodos]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = event.target.value;

    setSortOption(newSortOption);
    updateFilteredTodos(searchQuery, newSortOption);
  };

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
  // console.log(selectedTodo, 'selected todo');
  // console.log('isTodoModalVisible', isTodoModalVisibile);

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
