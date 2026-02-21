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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const onSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const visibleTodos = todos.filter(todo => {
    if (status === 'active') {
      return (
        !todo.completed &&
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
    } else if (status === 'completed') {
      return (
        todo.completed && todo.title.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return true && todo.title.toLowerCase().includes(query.toLowerCase());
    }
  });

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(result => setTodos(result))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodo?.id || null}
                onSelect={onSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={setSelectedTodo} />
      )}
    </>
  );
};
