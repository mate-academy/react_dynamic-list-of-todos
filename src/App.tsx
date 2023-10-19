/* eslint-disable max-len */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { StateContext } from './States/SelectedTodoState';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';
import { Loader } from './components/Loader';

const prepareTodos = (todos: Todo[], sortType: SortType, query: string): Todo[] => {
  let preparedTodos = [...todos];

  if (query) {
    preparedTodos = preparedTodos.filter(todo => {
      return todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }

  if (sortType) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (sortType) {
        case SortType.Active:
          return !todo.completed;
        case SortType.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState(SortType.All);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { selectedTodo } = useContext(StateContext);
  const preparedTodos = useMemo(
    () => prepareTodos(todos, sort, query),
    [query, sort, todos],
  );

  const reset = useCallback(() => {
    setQuery('');
    setSort(SortType.All);
  }, []);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sort={sort}
                query={query}
                onSortChange={setSort}
                onQueryChange={setQuery}
                onReset={reset}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && (
                <TodoList todos={preparedTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} />
      )}
    </>
  );
};
