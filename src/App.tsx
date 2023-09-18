/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { ForFilteredTodos, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { forFilteredTodos } from './components/helper';

type State = {
  todos: Todo[];
  selectedTodo: Todo | null;
  isLoading: boolean;
  query: string;
  selectedFilter: ForFilteredTodos;
};

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    todos: [],
    selectedTodo: null,
    isLoading: true,
    query: '',
    selectedFilter: ForFilteredTodos.all,
  });

  useEffect(() => {
    getTodos()
      .then((response) => {
        setState(prevState => ({ ...prevState, todos: response }));
      })
      .catch((error) => {
        throw new Error(`Error:${error}`);
      })
      .finally(() => setState(prevState => ({ ...prevState, isLoading: false })));
  }, []);

  const filteredOfTodos = useMemo(() => {
    return forFilteredTodos(state.todos, state.query, state.selectedFilter);
  }, [state.todos, state.query, state.selectedFilter]);

  const getSetQuery = (query: string) => {
    setState((prevState: State) => ({ ...prevState, query }));
  };

  const getSelectedFilter = (selectedFilter: ForFilteredTodos) => {
    setState((prevState: State) => ({ ...prevState, selectedFilter }));
  };

  const getSelectedTodo = (selectedTodo: Todo | null) => {
    setState((prevState: State) => ({ ...prevState, selectedTodo }));
  };

  const {
    query,
    selectedFilter,
    isLoading,
    selectedTodo,
  } = state;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                getSetQuery={getSetQuery}
                selectedFilter={selectedFilter}
                getSelectedFilter={getSelectedFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredOfTodos}
                  getSelectedTodo={getSelectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          getSelectedTodo={getSelectedTodo}
        />
      )}
    </>
  );
};
