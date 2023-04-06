/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect, useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortBy } from './types/SortOption';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortOption, setSortOption] = useState(SortBy.All);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState(0);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getTodosFromServer();
  }, []);

  const getVisibleTodos = (
    todosFilter: Todo[],
    sortOptionFilter: SortBy,
    queryFilter: string,
  ): Todo[] => {
    let filteredTodos = todos;

    switch (sortOptionFilter) {
      case SortBy.Active:
        filteredTodos = todosFilter.filter(todo => !todo.completed);
        break;

      case SortBy.Completed:
        filteredTodos = todosFilter.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(queryFilter.toLowerCase())
    ));
  };

  const activeTodo = useMemo(() => (
    todos.find(todo => todo.id === activeTodoId)
  ), [activeTodoId]);

  const changeActiveTodo = useCallback((id: number) => {
    setActiveTodoId(id);
  }, []);

  const visibleTodos = getVisibleTodos(todos, sortOption, query);
  const displayTodoList = todos.length > 0 && !error && !loading;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                onChangeSort={setSortOption}
              />
            </div>

            <div className="block">
              {error && !loading && (
                <p>Something went wrong...</p>
              )}
              {loading && !error && (
                <Loader />
              )}

              {displayTodoList && (
                <TodoList
                  todos={visibleTodos}
                  activeTodoId={activeTodoId}
                  onChangeActiveTodo={changeActiveTodo}
                />
              )}

              {activeTodo && (
                <TodoModal
                  todo={activeTodo}
                  onClose={() => changeActiveTodo(0)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
