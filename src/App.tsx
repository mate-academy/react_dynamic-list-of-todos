import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterTypes } from './components/enums/FilterTypes';

const filterAndSearchTodos = (
  todos: Todo[],
  filterQuery: FilterTypes,
  searchQuery: string,
): Todo[] => {
  const filteredTodos = todos.filter(todo => {
    if (filterQuery === FilterTypes.All) {
      return true;
    }

    return filterQuery === FilterTypes.Completed
      ? todo.completed
      : !todo.completed;
  });

  if (searchQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterQuery, setFilterQuery] = useState(FilterTypes.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const onCloseHandler = useCallback(() => {
    setSelectedTodo(null);
    setSearchQuery('');
  }, []);

  const filteredTodos = filterAndSearchTodos(todos, filterQuery, searchQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilterChange={setFilterQuery}
                handleInputChange={setSearchQuery}
              />
            </div>
            <div className="block">
              {isLoading ? (
                <Loader />
              ) : todos.length > 0 ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <p>No todos available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={onCloseHandler} />
      )}
    </>
  );
};
