/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const getFilteredTodos = (todos: Todo[], query: string, filter: FilterType) => {
  let filteredTodos = [...todos];

  if (query !== '') {
    const normalizedQuery = query.trim().toLowerCase();

    filteredTodos = filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(normalizedQuery);
    });
  }

  if (filter === FilterType.Active) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.completed === false;
    });
  }

  if (filter === FilterType.Completed) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.completed === true;
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalWindow, setModalWindow] = useState(false);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, query, filter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  setModalWindow={setModalWindow}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalWindow && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          modalWindow={modalWindow}
          setModalWindow={setModalWindow}
        />
      )}
    </>
  );
};
