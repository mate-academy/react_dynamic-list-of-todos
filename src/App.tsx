/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const debounce = (f: (query: string) => void, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);

    timerId = window.setTimeout(f, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [isShuffled, setShuffled] = useState(false);
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000), [],
  );

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  const filterTodos = () => {
    if (todos) {
      switch (filter) {
        case 'all':
          break;

        case 'active':
          return todos.filter(todo => todo.completed === false);

        case 'completed':
          return todos.filter(todo => todo.completed === true);

        default:
          break;
      }
    }

    return todos;
  };

  const arrangeTodo = () => {
    const arrangedTodo = filterTodos();

    if (arrangedTodo) {
      return arrangedTodo.filter(todo => todo.title.toLowerCase().includes(appliedQuery.toLowerCase()));
    }

    return arrangedTodo;
  };

  function shuffleTodo() {
    const shuffledTodo = arrangeTodo();

    if (shuffledTodo) {
      let j; let
        temp;

      for (let i = shuffledTodo.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = shuffledTodo[j];
        shuffledTodo[j] = shuffledTodo[i];
        shuffledTodo[i] = temp;
      }
    }

    return shuffledTodo;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <button
              type="button"
              className="button is-warning subtitle"
              onClick={() => setShuffled(!isShuffled)}
            >
              Randomize
            </button>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={(q) => {
                  setQuery(q);
                }}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {!todos && <Loader />}

              <TodoList
                todos={
                  isShuffled
                    ? shuffleTodo()
                    : arrangeTodo()
                }
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setSelectedTodo={() => setSelectedTodo(null)}
          />
        )}
    </>
  );
};
