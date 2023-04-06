/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FIlterBy';
import { getVisibleTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [shownTodoId, setshownTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const changeShownTodo = useCallback((id: number) => {
    setshownTodoId(id);
  }, []);

  const activeTodo = useMemo(() => (
    todos.find(({ id }) => id === shownTodoId)
  ), [shownTodoId]);

  const visibleTodos = getVisibleTodos(todos, query, filterBy);

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
                onChangeFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading && !isError
                && (<Loader />)}
              <TodoList
                todos={visibleTodos}
                onSelectTodo={changeShownTodo}
                selectedTodo={shownTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {activeTodo
        && (
          <TodoModal
            todo={activeTodo}
            onHide={() => changeShownTodo(0)}
          />
        )}
    </>
  );
};
