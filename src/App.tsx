import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { FilterBy } from './types/FilterBy';

const findQueryInTheString = (query: string, title: string) => {
  const queryToLower = query.toLowerCase().trim();
  const titleToLower = title.toLowerCase();

  return titleToLower.includes(queryToLower);
};

const debounce = (f: (string: string) => void, delay: number) => {
  let timerId: any;

  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [option, setOption] = useState<FilterBy>(FilterBy.all);

  // eslint-disable-next-line no-console
  console.log(option, appliedQuery);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const handleSelectedTodo = useCallback((todo: Todo) => (
    setSelectedTodo(todo)
  ), []);

  const handleClearSelectedTodo = useCallback(() => setSelectedTodo(null), []);

  const handleChangeQuery = useCallback((value: string) => setQuery(value), []);

  const handleChangeOption = useCallback((value: FilterBy) => (
    setOption(value)
  ), []);

  useEffect(
    () => {
      getTodos()
        .then(setTodos)
        .finally(() => setIsLoadingTodos(false))
        .catch(error => {
          throw new Error(`${error} Error`);
        });
    }, []);

  let visibleTodos = useMemo(() => todos.filter(({ title }) => (
    findQueryInTheString(appliedQuery, title))), [appliedQuery, todos]);

  if (option !== FilterBy.all) {
    visibleTodos = visibleTodos.filter(({ completed }) => {
      switch (option) {
        case FilterBy.completed:
          return completed;
        case FilterBy.active:
          return !completed;
        default:
          return true;
      }
    });
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={handleChangeQuery}
                onChangeOption={handleChangeOption}
                onChangeApplyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <>
                  {!visibleTodos.length
                    ? (
                      <h1>Todos not found...</h1>
                    ) : (
                      <TodoList
                        todos={visibleTodos}
                        userId={selectedTodo?.id || null}
                        onSelect={handleSelectedTodo}
                      />
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleClearSelectedTodo}
        />
      )}
    </>
  );
};
