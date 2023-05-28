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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  function getReorderedTodos(todosFromServer: Todo[]) {
    let visibleTodos = [...todosFromServer];

    visibleTodos = visibleTodos.filter((todo) => {
      switch (status) {
        case 'all':
          return todo;

        case 'completed':
          return todo.completed;

        case 'active':
          return !todo.completed;

        default:
          return 0;
      }
    });

    if (query) {
      visibleTodos = visibleTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return visibleTodos;
  }

  useEffect(() => {
    async function getTodosFromServer() {
      const todosFromServer = await getTodos();

      setTodos(getReorderedTodos(todosFromServer));
      setIsLoaded(true);
    }

    getTodosFromServer();
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
                status={status}
                onQueryChanged={setQuery}
                onStatusChanged={setStatus}
              />
            </div>

            <div className="block">
              {!isLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
