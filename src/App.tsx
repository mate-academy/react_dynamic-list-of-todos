/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterValue, setFilterValue] = useState('');
  const [query, setQuery] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredByInput = () => {
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(filterValue.toLowerCase()),
    );
  };

  function renderThis() {
    if (query === 'all') {
      return filteredByInput();
    }

    if (query === 'active') {
      return filteredByInput().filter(todo => todo.completed === false);
    }

    if (query === 'completed') {
      return filteredByInput().filter(todo => todo.completed === true);
    }

    return todos;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={filterValue}
                setiInputValue={setFilterValue}
                setQueryFilter={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}

              <TodoList
                chousenTodo={selectedTodo}
                chooseTodo={setSelectedTodo}
                todos={renderThis()}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal chousenTodo={selectedTodo} chooseTodo={setSelectedTodo} />
      )}
    </>
  );
};
