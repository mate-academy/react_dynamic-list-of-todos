/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null) ;
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos().then(result => setTodos(result));
  }, []);

  const preparedTodos = todos.filter(todo => {
    if ((status === 'active' && todo.completed)
     || (status === 'completed' && !todo.completed)) {
      return false;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
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
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.id && (
        <TodoModal
          cancelSelectedTodo={() => setSelectedTodo(null)}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
