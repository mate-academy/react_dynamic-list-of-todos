/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [completedFilter, setCompletedFilter] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      const queryFilter = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

      switch (completedFilter) {
        case 'active':
          return queryFilter && todo.completed === false;

        case 'completed':
          return queryFilter && todo.completed === true;

        default:
          return queryFilter;
      }
    })), [todos, searchQuery, completedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} completedFilter={completedFilter} setCompletedFilter={setCompletedFilter} />
            </div>

            <div className="block">
              {filteredTodos.length === 0
                ? <Loader />
                : <TodoList todos={filteredTodos} selectedTodoId={selectedTodoId} setSelectedTodo={setSelectedTodo} setSelectedTodoId={setSelectedTodoId} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} setSelectedTodoId={setSelectedTodoId} />
      )}
    </>
  );
};
