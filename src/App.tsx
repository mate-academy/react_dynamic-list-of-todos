/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuert] = useState('');
  const [searchBySelect, setSearchBySelect] = useState('all');
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isTodosError, setIsTodosError] = useState(false);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setIsTodosError(true))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const selectTodoId = useCallback((todoId: number) => {
    setSelectedTodoId(todoId);
  }, []);

  const closeTodoModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const isSearchQuery = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

      let isSearchBySelect;

      switch (searchBySelect) {
        case 'completed':
          isSearchBySelect = todo.completed;
          break;

        case 'active':
          isSearchBySelect = !todo.completed;
          break;

        case 'all':
          return isSearchQuery;

        default:
          break;
      }

      return isSearchQuery && isSearchBySelect;
    });
  }, [todos, searchQuery, searchBySelect]);

  const isNoFiltersResult = searchQuery && !visibleTodos.length;

  const selectedTodo = useMemo(() => {
    return todos.find(
      todo => todo.id === selectedTodoId,
    );
  }, [selectedTodoId, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                setQuery={setSearchQuert}
                searchBySelect={searchBySelect}
                setSearchBySelect={setSearchBySelect}
              />
            </div>

            <div className="block">
              {!isTodosLoading
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodoId={selectTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : (
                  <Loader />
                )}

              {isTodosError && (
                <p>Something went wrong</p>
              )}

              {isNoFiltersResult && (
                <p>No todos matched filters</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeTodoModal} />
      )}
    </>
  );
};
