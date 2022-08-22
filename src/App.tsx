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
  const [selectedValue, setSelectedValue] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const filteredTodos = todos.filter(todo => {
    const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (selectedValue) {
      case 'active':
        return queryFilter && todo.completed === false;

      case 'completed':
        return queryFilter && todo.completed === true;

      default:
        return queryFilter;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} setQuery={setQuery} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : <TodoList todos={filteredTodos} setSelectedTodo={setSelectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
