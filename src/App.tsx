/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = (): Todo[] => {
    const result = todos.filter(
      (todo: Todo) =>
        todo.title.toLowerCase().indexOf(query.toLowerCase()) >= 0,
    );

    switch (status) {
      case 'active':
        return result.filter((todo: Todo) => !todo.completed);

      case 'completed':
        return result.filter((todo: Todo) => todo.completed);
      default:
        return result;
    }
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onQueryChanged={value => setQuery(value)}
                onStatusChanged={value => setStatus(value)}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={filteredTodos()}
                  todoId={selectedTodo?.id}
                  onTodoSelected={todo => setSelectedTodo(todo)}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={value => setSelectedTodo(value)}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
