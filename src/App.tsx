/* eslint-disable max-len */
import React, { useEffect, useReducer } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { State, reducer } from './helpers/todos.reducer';

const initialState: State = {
  initialTodos: [],
  todos: [],
  isLoading: false,
  searchQuery: '',
  filter: 'all',
  currentTodo: null,
};

export const App: React.FC = () => {
  const [{
    todos, isLoading, filter, searchQuery, currentTodo,
  }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'setLoading', payload: true });

    getTodos()
      .then(fetchedTodos => dispatch({ type: 'setInitialTodos', payload: fetchedTodos }))
      .finally(() => dispatch({ type: 'setLoading', payload: false }));
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
                filter={filter}
                onSearchQueryChange={
                  (newQuery) => dispatch({ type: 'setSearchQuery', payload: newQuery })
                }
                onFilterChange={
                  (newFilter) => dispatch({ type: 'setFilter', payload: newFilter })
                }
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
                currentTodoId={currentTodo?.id}
                onCurrentTodoChange={payload => dispatch({ type: 'setCurrentTodo', payload })}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          onClose={() => dispatch({ type: 'setCurrentTodo', payload: null })}
        />
      )}
    </>
  );
};
