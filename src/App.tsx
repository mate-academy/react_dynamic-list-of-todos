/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [usersFromServer] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setLoading(false));
  }, []);

  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const todos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const filteredTodos = !query
    ? todos
    : [...todos].filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );

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
                addTodos={setTodosFromServer}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todosFromServer.length > 0 && (
                <TodoList
                  changeModal={setIsModal}
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  isModal={isModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && isModal && (
        <TodoModal closeModal={setIsModal} selectedTodo={selectedTodo} />
      )}
    </>
  );
};
