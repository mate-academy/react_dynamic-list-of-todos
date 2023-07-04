/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filters>(Filters.All);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        /* eslint-disable no-console */
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const titleToLC = todo.title.toLocaleLowerCase();
      const queryToLC = query.toLocaleLowerCase();

      switch (filter) {
        case Filters.All:
          return titleToLC.includes(queryToLC);
        case Filters.Completed:
          return titleToLC.includes(queryToLC) && todo.completed;
        case Filters.Active:
          return titleToLC.includes(queryToLC) && !todo.completed;
        default:
          return todos;
      }
    });
  }, [query, todos, filter]);

  const clearForm = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filter={filter}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={(todo: Todo | null) => {
                    setSelectedTodo(todo);
                  }}
                />
              ) : (
                <Loader />
              )}
            </div>

          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal selectedTodo={selectedTodo} clearForm={clearForm} />}
    </>
  );
};
