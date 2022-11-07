import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

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
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosList => setTodos(todosList));
  }, [todos]);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 500), [],
  );

  const filteringTodos = (todosList: Todo[] | null, filterQuery: string) => {
    if (!todosList) {
      return null;
    }

    return todosList.filter(todo => {
      switch (filter) {
        case 'all':
          return todo.title.toLowerCase().includes(filterQuery.toLowerCase());

        case 'active':
          return !todo.completed
            && todo.title.toLowerCase().includes(filterQuery.toLowerCase());

        case 'completed':
          return todo.completed
            && todo.title.toLowerCase().includes(filterQuery.toLowerCase());

        default:
          return todo;
      }
    });
  };

  const filteredTodos = filteringTodos(todos, appliedQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                filter={filter}
                query={query}
                setQuery={setQuery}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {!todos && <Loader />}

              {filteredTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
