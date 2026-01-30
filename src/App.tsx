/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState('all');
  const [postId, setPostId] = React.useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredByStatus = () => {
    switch (status) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredByStatus().filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  postId={postId}
                  todos={filteredTodos}
                  setPostId={setPostId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {postId !== null && (
        <TodoModal
          postId={postId}
          onClose={() => setPostId(null)}
          todos={todos}
        />
      )}
    </>
  );
};
