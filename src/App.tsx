/* eslint-disable max-len */
import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatusOptions } from './enums/TodoStatusOptions';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getFilteredTodos } from './helpers';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>(TodoStatusOptions.all);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoadingError, setHasLoadingError] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasLoadingError(true);
    }
  }, []);

  const visibleTodos = getFilteredTodos(todos, searchQuery, selectedOption);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {/* eslint-disable-next-line no-nested-ternary */}
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                  hasLoadingError={hasLoadingError}
                  isLoading={isLoading}
                  loadTodos={fetchTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
