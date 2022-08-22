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
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (filterBy) {
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
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList todos={filteredTodos} onSelectedTodo={setSelectedTodo} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />)}
    </>
  );
};
