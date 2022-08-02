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
import { Sort } from './types/Sort';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoaded] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userId, setUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Sort>(Sort.all);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setIsLoaded(false);
    });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const includes = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (statusFilter) {
      case Sort.completed:
        return todo.completed && includes;
      case Sort.active:
        return !todo.completed && includes;
      default:
        return includes;
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
              {isLoading
                ? <Loader />
                : (
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
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
