/* eslint-disable no-console */
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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = todos.filter(todo => {
    // const statusFilter = query === 'all' || !query;
    const textFilter = todo.title.toLowerCase().includes(query.toLowerCase());

    return textFilter;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={setQuery}
                onClearSearch={() => setQuery('')}
              />
            </div>

            <div className="block">
              {filteredTodos.length > 0 ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelected={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
