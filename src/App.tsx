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

const findQueryInTheString = (query: string, title: string) => {
  const queryToLower = query.toLowerCase().trim();
  const titleToLower = title.toLowerCase();

  return titleToLower.includes(queryToLower);
};

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');

  let visibleTodos = useMemo(() => {
    return [...todos];
  }, [todos]);

  const handleSelectedTodo = useCallback((todo: Todo) => (
    setSelectedTodo(todo)), []);
  const handleClearSelectedTodo = useCallback(() => setSelectedTodo(null), []);
  const handleChangeQuery = useCallback((value: string) => setQuery(value), []);
  const handleChangeOption = useCallback((value: string) => (
    setOption(value)), []);

  useEffect(
    () => {
      getTodos()
        .then(setTodos)
        .finally(() => setIsLoadingTodos(false))
        .catch(error => {
          throw new Error(`${error} Error`);
        });
    },
    [],
  );

  if (query) {
    visibleTodos = visibleTodos.filter(todo => (
      findQueryInTheString(query, todo.title)));
  }

  if (option !== 'all') {
    switch (option) {
      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed === true);
        break;
      case 'active':
        visibleTodos = visibleTodos.filter(todo => todo.completed === false);
        break;
      default:
    }
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
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <>
                  {visibleTodos.length === 0
                    ? (
                      <h1>Todos not found...</h1>
                    ) : (
                      <TodoList
                        todos={visibleTodos}
                        userId={selectedTodo?.id || null}
                        onChangeSelectedTodo={handleSelectedTodo}
                      />
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          onClearUserId={handleClearSelectedTodo}
        />
      )}
    </>
  );
};
