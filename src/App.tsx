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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const preparedTodos = todos.filter(todo => {
    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const closeTodo = () => {
    setSelectedTodo(undefined);
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} closeTodo={closeTodo} />}
    </>
  );
};
