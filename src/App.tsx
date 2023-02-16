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
  const [completedStatus, setCompletedStatus] = useState('');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const getTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    };

    getTodosFromServer();
  }, []);

  let visibleTodos = [...todos];

  if (completedStatus === 'active') {
    visibleTodos = todos.filter(todo => !todo.completed);
  }

  if (completedStatus === 'completed') {
    visibleTodos = todos.filter(todo => todo.completed);
  }

  if (query.trim()) {
    visibleTodos = visibleTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase().trim();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={completedStatus}
                setStatus={setCompletedStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">

              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodoId={selectedTodo?.id || 0}
                  />
                )
                : <Loader />}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />}
    </>
  );
};
