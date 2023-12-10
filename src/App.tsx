/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import './App.scss';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const preparedTodos: Todo[] = useMemo(() => {
    let filteredTodos = todos;

    if (query) {
      filteredTodos = filteredTodos.filter(todo => (
        todo.title.toLowerCase().includes(query.toLowerCase().trim())
      ));
    }

    if (filter) {
      switch (filter) {
        case Filters.completed:
          return filteredTodos.filter(todo => todo.completed);

        case Filters.active:
          return filteredTodos.filter(todo => !todo.completed);

        default:
          return filteredTodos;
      }
    }

    return filteredTodos;
  }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!preparedTodos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
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
