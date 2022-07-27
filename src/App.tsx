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
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userId, setUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setIsLoaded(false);
    });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (statusFilter) {
      case 'completed':
        return todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());
      case 'active':
        return !todo.completed && todo.title.toLowerCase().includes(query.toLowerCase());
      default:
        return todo.title.toLowerCase().includes(query.toLowerCase());
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
                setQuery={setQuery}
                query={query}
                setStatusFilter={setStatusFilter}
              />
            </div>

            <div className="block">
              {isLoaded && <Loader />}
              {!isLoaded && (
                <TodoList
                  selectedTodoID={selectedTodo}
                  todos={filteredTodos}
                  selectedTodo={todo => setSelectedTodo(todo)}
                  userId={user => setUserId(user)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          userId={userId}
          todo={selectedTodo}
          selectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
