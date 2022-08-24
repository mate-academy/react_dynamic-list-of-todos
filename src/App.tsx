/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoComplitedFilter, TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [complitedFilter, setComplitedFilter] = useState<TodoComplitedFilter>(TodoComplitedFilter.All);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId) || null
  ), [selectedTodoId]);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const inputFilter = todo.title.toLowerCase().includes(query.toLowerCase().trim());

      switch (complitedFilter) {
        case TodoComplitedFilter.Active:
          return inputFilter && todo.completed === false;

        case TodoComplitedFilter.Completed:
          return inputFilter && todo.completed === true;

        default:
          return inputFilter;
      }
    })
  ), [query, todos, complitedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                changeQuery={setQuery}
                complitedFilter={complitedFilter}
                setComplitedFilter={setComplitedFilter}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onSelect={setSelectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={setSelectedTodoId} />}
    </>
  );
};
