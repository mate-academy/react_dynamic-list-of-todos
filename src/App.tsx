/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { SelectType, Todo } from './types';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>(SelectType.All);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getTodos();

        setTodos(data);
      } catch (err : unknown) {
        if (err instanceof Error) {
          setError('404 Not Found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredByQuery = useCallback((data : Todo[]) => {
    return data.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }, [query]);

  const filteredByOptions = useCallback((data : Todo[]) => {
    switch (selectedOption) {
      case SelectType.Active:
        return data.filter(todo => !todo.completed);
      case SelectType.Completed:
        return data.filter(todo => todo.completed);
      case SelectType.All:
      default:
        return data;
    }
  }, [selectedOption]);

  const todosWihtFilters = useMemo(() => {
    let result:Todo[] = [...todos];

    result = filteredByQuery(result);
    result = filteredByOptions(result);

    return result;
  }, [todos, filteredByOptions, filteredByQuery]);

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
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {error && <p>{error}</p>}
                    {todos && (
                      <TodoList
                        todos={todosWihtFilters}
                        currentTodo={currentTodo}
                        setCurrentTodo={setCurrentTodo}
                      />
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />}
    </>
  );
};
