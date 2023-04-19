import React, { useState, useMemo, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(result => setTodos(result));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const filterTitle = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (selectedFilter) {
        case 'active':
          return !todo.completed && filterTitle;
        case 'completed':
          return todo.completed && filterTitle;
        default:
          return filterTitle;
      }
    });
  }, [todos, query, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={selectedFilter}
                setFilterBy={setSelectedFilter}
                value={query}
                setValue={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
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
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
