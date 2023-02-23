import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { TodoList } from './components/TodoList';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<SortType>(SortType.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const setTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        throw new Error('error');
      }
    };

    setTodosFromServer();
  }, []);

  const filteredAndSortedTodos = useMemo(() => {
    return todos.filter(todo => {
      const filteredBySearchQuery = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      switch (sortType) {
        case SortType.active:
          return !todo.completed && filteredBySearchQuery;

        case SortType.completed:
          return todo.completed && filteredBySearchQuery;

        case SortType.all:
        default:
          return filteredBySearchQuery;
      }
    });
  }, [sortType, todos, searchQuery]);

  const handleSearchQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    [],
  );

  const reset = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleSelectedTodo = useCallback(() => {
    setSelectedTodo(null);
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                handleSearchQueryChange={handleSearchQueryChange}
                resetSearchQuery={reset}
                sortType={sortType}
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredAndSortedTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleSelectedTodo={handleSelectedTodo}
        />
      )}
    </>
  );
};
