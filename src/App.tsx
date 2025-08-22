/* eslint-disable max-len */

import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { MemoTodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export enum CompletedStates {
  Completed = 'completed',
  Active = 'active',
  All = 'all',
}

const filterTodos = (
  todos: Todo[],
  completeState: CompletedStates,
  searchQuery: string,
): Todo[] => {
  let filteredTodos = todos;

  if (completeState !== CompletedStates.All) {
    filteredTodos = filteredTodos.filter(todo => {
      if (completeState === CompletedStates.Active) {
        return !todo.completed;
      } else {
        return todo.completed;
      }
    });
  }

  if (searchQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stateForFilter, setStateForFilter] = useState<CompletedStates>(
    CompletedStates.All,
  );
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, stateForFilter, query);
  }, [todos, stateForFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setFilter={setStateForFilter}
                filter={stateForFilter}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && error && (
                <p className='error'>{error}</p>
              )}
              {!isLoading && !error && <MemoTodoList
                todos={filteredTodos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
