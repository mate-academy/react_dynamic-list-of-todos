/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/Filter';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [FilterOption, setFilterOption] = useState(FilterBy.All);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState(0);

  const getTodosFromServer = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, [getTodosFromServer]);

  const getVisibleTodos = (
    todosFilter: Todo[],
    FilterOptionFilter: FilterBy,
    queryFilter: string,
  ): Todo[] => {
    let filteredTodos = todos;

    switch (FilterOptionFilter) {
      case FilterBy.Active:
        filteredTodos = todosFilter.filter(todo => !todo.completed);
        break;

      case FilterBy.Completed:
        filteredTodos = todosFilter.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(queryFilter.toLowerCase())
    ));
  };

  const activeTodo = todos.find(todo => todo.id === activeTodoId);

  const changeActiveTodo = useCallback((id: number) => {
    setActiveTodoId(id);
  }, [activeTodoId]);

  const visibleTodos = getVisibleTodos(todos, FilterOption, query);
  const displayTodoList = todos.length > 0 && !isError && !isLoading;

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
                onChangeFilter={setFilterOption}
              />
            </div>

            <div className="block">
              {isLoading && !isError && (
                <Loader />
              )}

              {isError && !isLoading && (
                <p>Something went wrong...</p>
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
