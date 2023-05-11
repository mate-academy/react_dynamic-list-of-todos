/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleTodo = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const isInclude = (todo: string) => {
    return todo.toLowerCase().includes(query.toLowerCase().trim());
  };

  const filteredTodos = filter === 'all'
    ? todos.filter(todo => isInclude(todo.title))
    : todos.filter((todo) => {
      if (filter === 'active') {
        return !todo.completed && isInclude(todo.title);
      }

      return todo.completed && isInclude(todo.title);
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={setFilter}
                query={query}
                onSetQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo?.id}
                    onSelectedTodo={handleTodo}
                  />
                ) }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            onClose={() => setSelectedTodo(null)}
            todo={selectedTodo}
          />
        ) }
    </>
  );
};
