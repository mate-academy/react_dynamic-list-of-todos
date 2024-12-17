/* eslint-disable max-len */

// default imports

import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// components

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

// outer function

import { getTodos } from './api';
import { filterTodos } from './utils/filterTodos';

// types

import { Todo } from './types/Todo';
import { FilterByState } from './types/FilterByState';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterByState>(FilterByState.ALL);
  const [query, setQuery] = useState('');
  const [hasErrorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodoList)
      .catch(e => setErrorMessage('Failed to download the todos' + e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = filterTodos(todoList, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          {hasErrorMessage && <h1 className="title">{hasErrorMessage}</h1>}
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && !hasErrorMessage && (
                <TodoList
                  todoList={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
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
