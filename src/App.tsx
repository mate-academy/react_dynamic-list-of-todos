/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import './App.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completeTodoFilter, setCompleteTodoFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodosId, setSelectedTodosId] = useState<number | null>(null);

  const prettyQuery = query.toLowerCase().trim();

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  let visibleTodos = [...todos];

  if (completeTodoFilter === 'active') {
    visibleTodos = [...todos].filter(el => el.completed === false);
  }

  if (completeTodoFilter === 'completed') {
    visibleTodos = [...todos].filter(el => el.completed === true);
  }

  const visibleFilteredTodos = (allTodos: Todo[]) => {
    return allTodos.filter(allTodo => allTodo.title.toLowerCase().includes(prettyQuery));
  };

  const preparedTodos = visibleFilteredTodos(visibleTodos);

  const selectedTodo = todos.find(el => el.id === selectedTodosId) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                completeTodoFilter={completeTodoFilter}
                setCompleteTodoFilter={setCompleteTodoFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              <TodoList
                preparedTodos={preparedTodos}
                setSelectedTodosId={setSelectedTodosId}
                selectedTodosId={selectedTodosId}
              />
              {!todos.length && <Loader />}
            </div>
          </div>
        </div>
      </div>

      { selectedTodosId && (
        <TodoModal
          setSelectedTodosId={setSelectedTodosId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
