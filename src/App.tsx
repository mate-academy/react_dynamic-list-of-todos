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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
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

  const visibleTodos = getVisibleTodos(todos, query, filterBy);

  const changeSelectedTodo = (id: number) => {
    setSelectedTodoId(id);
  };

  const activeTodo = useMemo(() => (
    todos.find((todo) => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const handleClearSelectedTodo = () => changeSelectedTodo(0);

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
              {isLoading && !isError && (
                <Loader />
              )}

              {!isLoading && !isError && (
                <TodoList
                  todos={visibleTodos}
                  onSelectedTodo={changeSelectedTodo}
                  selectedTodo={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          todo={activeTodo}
          onHide={handleClearSelectedTodo}
        />
      )}

    </>
  );
};
