/* eslint-disable max-len */
import React,
{
  useState,
  useEffect,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { getTodos } from './api';
import { getVisibleTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const getTodosFromApi = async () => {
    try {
      const todosFromApi = await getTodos();

      setTodos(todosFromApi);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromApi();
  }, []);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, filterBy)
  ), [todos, query, filterBy]);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleClearSelectedTodo = () => setSelectedTodo(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetQuery={setQuery}
                onChangeFilter={setFilterBy}
              />
            </div>

            <div className="block">
              {!isError && isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onSelectedTodo={selectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onHide={handleClearSelectedTodo}
        />
      )}

    </>
  );
};
