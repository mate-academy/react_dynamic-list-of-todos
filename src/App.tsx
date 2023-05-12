import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum Category {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [visibleTodos, setTodos] = useState<Todo[]>([]);
  const [searchedTodo, setSearchedTodos] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoCategory, setTodoCategory] = useState('all');

  const loadTodos = useCallback(async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  }, []);

  useEffect(() => {
    loadTodos();
  }, [todoCategory]);

  const handleReset = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchedTodos(search);
  }, []);

  const handleFilter = useCallback((category: string) => {
    setTodoCategory(category);
  }, []);

  const filterTodos = useCallback((search: string, category: string) => {
    let categoryStatus: boolean | null = null;

    switch (category) {
      case Category.ACTIVE:
        categoryStatus = false;
        break;
      case Category.COMPLETED:
        categoryStatus = true;
        break;
      case Category.ALL:
        categoryStatus = null;
        break;
      default:
        categoryStatus = false;
    }

    return visibleTodos.filter(todo => {
      const formattedTitle = todo.title.toLowerCase();
      const formattedSearch = search.toLowerCase();

      if (category === 'all') {
        return formattedTitle.includes(formattedSearch);
      }

      return formattedTitle.includes(formattedSearch)
        && (todo.completed === categoryStatus);
    });
  }, [searchedTodo, todoCategory, visibleTodos]);

  const filteredTodos = filterTodos(searchedTodo, todoCategory);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={todoCategory}
                onFilter={handleFilter}
                search={searchedTodo}
                onSearchTodo={handleSearch}
              />
            </div>

            <div className="block">
              {visibleTodos.length || <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={(todo: Todo | null) => setSelectedTodo(todo)}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onReset={handleReset}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
