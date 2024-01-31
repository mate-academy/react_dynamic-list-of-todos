/* eslint-disable no-nested-ternary */
import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useContext,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/helperType';
import { TodoModal } from './components/TodoModal';
import { FilterReducer, debonce, filterTodosByTitle } from './helper';
import { TodoContext } from './components/TodoContext/TodoProvider';

export const App: React.FC = () => {
  const [initialTodoState, setІnitialTodoState] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [applyedQuery, setApplyedQuery] = useState<string>('');
  const { selectedTodo } = useContext(TodoContext);

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setІnitialTodoState(todosData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const applyQuery = useCallback(debonce<string>(setApplyedQuery, 500), []);

  const todos = useMemo(() => {
    const data = FilterReducer(initialTodoState, filterType);

    setIsLoading(false);

    return applyedQuery ? filterTodosByTitle(data, applyedQuery) : data;
  }, [filterType, initialTodoState, applyedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterType={setFilterType}
                applyQuery={applyQuery}
                setIsLoading={setIsLoading}
              />
            </div>

            <div className="block">

              {isLoading
                ? <Loader />
                : todos.length !== 0
                  ? <TodoList todos={todos} />
                  : <h2>No results</h2>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
