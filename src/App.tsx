/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export type State = 'all' | 'active' | 'completed';

function filterTodo(todos: Todo[] | null, query: string, stateFilter: State) {
  if (!todos) {
    return;
  }

  let filteredTodo = [...todos];

  if (stateFilter !== 'all') {
    const isCompleted = stateFilter === 'completed';

    filteredTodo = filteredTodo.filter(todo => todo.completed === isCompleted);
  }

  if (query !== '') {
    const preparedQuery = query.toLowerCase();

    filteredTodo = filteredTodo.filter(todo =>
      todo.title.toLowerCase().includes(preparedQuery),
    );
  }

  return filteredTodo;
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [stateFilter, setStateFilter] = useState<State>('all');
  const [queryFilter, setQueryFilter] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const onStateFilterCallback = useCallback((value: State) => {
    setStateFilter(value);
  }, []);

  const onChangeInput = useCallback((value: string) => {
    setQueryFilter(value);
  }, []);

  const onSelectTodo = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const onCloseModal = useCallback(() => {
    setSelectedTodoId(null);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(
    () => filterTodo(todos, queryFilter, stateFilter),
    [todos, queryFilter, stateFilter],
  );

  const activeTodo = todos?.find(todo => todo.id === selectedTodoId) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectState={onStateFilterCallback}
                onChangeInput={onChangeInput}
                query={queryFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos || []}
                  selectedId={selectedTodoId}
                  onSelected={onSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== null && (
        <TodoModal todo={activeTodo} onClose={onCloseModal} />
      )}
    </>
  );
};
