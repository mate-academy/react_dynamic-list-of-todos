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
  const [query, setQuery] = useState('');
  const [todosState, setTodosState] = useState('all');

  useEffect(() => {
    getTodos()
      .then((loadedTodos) => setTodos(loadedTodos));
  }, []);

  const visibleTodos:Todo[] = todos.filter(todo => {
    const loweredQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (todosState === 'active') {
      return loweredQuery && todo.completed === false;
    }

    if (todosState === 'completed') {
      return loweredQuery && todo.completed === true;
    }

    return loweredQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} setQuery={setQuery} setTodosState={setTodosState} todosState={todosState} />
            </div>

            <div className="block">
              {todos.length > 0
                ? <TodoList todos={visibleTodos} setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
