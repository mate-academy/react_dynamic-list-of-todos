import React, {
  useState, useEffect, useCallback, useMemo, ChangeEvent,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [clickedTodo, setClickedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const getTodoList = async (todosFromServer: Promise<Todo[]>) => {
    setLoading(true);
    setHasError(false);

    try {
      const todoList = await todosFromServer;

      setTodos(todoList);
      setIsInitialized(true);
      setLoading(false);
    } catch {
      setHasError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodoList(getTodos());
  }, []);

  const getFilteredTodos = useCallback((todosList: Todo[]) => {
    if (!todosList.length) {
      return [];
    }

    return todosList.filter(todo => {
      const normalizedBase = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase().trim();
      const currentQuery = normalizedBase.includes(normalizedQuery);

      switch (sortType) {
        case 'active':
          return !todo.completed && currentQuery;

        case 'completed':
          return todo.completed && currentQuery;

        default:
        case 'all':
          return todo && currentQuery;
      }
    });
  }, [sortType, query]);

  const groupByStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
    getFilteredTodos(todos);
  };

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos)
  ), [todos, query, sortType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">
              Todos:
            </h1>

            <div className="block">
              <TodoFilter
                value={query}
                onQuery={setQuery}
                onFilter={groupByStatus}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {isInitialized && (
                <TodoList
                  todos={filteredTodos}
                  clickedTodo={clickedTodo}
                  onClickTodo={setClickedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {clickedTodo && (
        <TodoModal
          clickedTodo={clickedTodo}
          onClickTodo={setClickedTodo}
        />
      )}

      {hasError && (
        <div
          className="
            container
            box
            notification
            is-danger
            is-light"
        >
          Oh, no! Error during loading data from server!
        </div>
      )}
    </>
  );
};
