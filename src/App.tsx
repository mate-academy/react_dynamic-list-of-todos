/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { getTodos, getUser } from '../src/api';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [user, setUser] = useState<null | User>(null);

  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  function handleClickClose() {
    setUser(null);
    setSelectedTodo(null);
  }

  function handleTodoClick(todo: Todo) {
    setLoadingUser(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(setUser)
      // eslint-disable-next-line no-console
      .catch(error => console.error(error))
      .finally(() => setLoadingUser(false));
  }

  function handleInputReset() {
    setQuery('');
  }

  useEffect(() => {
    let result = [];

    if (status === 'all') {
      result = [...allTodos];
    } else if (status === 'completed') {
      result = [...allTodos.filter(tod => tod.completed)];
    } else {
      result = [...allTodos.filter(tod => !tod.completed)];
    }

    result = result.filter(text =>
      text.title.toLowerCase().includes(query.toLowerCase()),
    );

    setVisibleTodos(result);
  }, [status, allTodos, query]);

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(setAllTodos)
      // eslint-disable-next-line no-console
      .catch(error => console.log(error))
      .finally(() => setLoadingTodos(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={setStatus}
                status={status}
                query={query}
                onInputChange={setQuery}
                handleInputReset={handleInputReset}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                selectedTodoId={selectedTodo?.id}
                todos={visibleTodos}
                handleTodoClick={handleTodoClick}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loadingUser={loadingUser}
          user={user}
          handleClickClose={handleClickClose}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
