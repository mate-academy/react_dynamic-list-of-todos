/* eslint-disable max-len */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api/todos';
import { filterByOption, filterByQuery } from './services/filter';
import { DispatchContext, StateContext } from './Store';
import { Todo } from './types/Todo';
import { ActionType } from './types/Action';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    todos,
    openedTodo,
    filter,
    isModalOpened,
    isLoadingTodos,
  } = useContext(StateContext);

  const filterTodos = useCallback((todosToFilter: Todo[]) => {
    const { option, query } = filter;

    return filterByQuery(filterByOption(todosToFilter, option), query);
  }, [filter]);

  const applyedFilterTodos = filterTodos(todos);
  const [filteredTodos, setFilteredTodos] = useState(applyedFilterTodos);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      dispatch({ type: ActionType.setTodos, payload: todosFromServer });
      dispatch({ type: ActionType.setIsLoadingTodos, payload: false });
    });
  }, [dispatch]);

  useEffect(() => {
    setFilteredTodos(filterTodos(todos));
  }, [todos, filter, filterTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoadingTodos && (
                <Loader />
              )}

              {!isLoadingTodos && todos.length > 0 && (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpened && (
        <TodoModal todo={openedTodo} />
      )}
    </>
  );
};
