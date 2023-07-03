/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import './App.scss';
import { FilterTodos } from './types/FilterTodos';
import { filter } from './helpers/FilterTodos';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(FilterTodos.ALL);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);

        const todos = await getTodos();

        setVisibleTodos(todos);
      } catch (error) {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleSelected = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleStatus = useCallback((todoStatus: FilterTodos) => {
    setStatus(todoStatus);
  }, []);

  const filterTodos = (search: string, todoStatus: FilterTodos) => {
    const formattedQuery = search.toLowerCase();

    return filter(
      visibleTodos,
      todoStatus,
      formattedQuery,
    );
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(query, status);
  }, [visibleTodos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                handleStatus={handleStatus}
              />
            </div>

            <div className="block">
              {!isLoading
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    handleSelected={handleSelected}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
