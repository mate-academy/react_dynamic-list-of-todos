/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const [status, setStatus] = useState<FilterStatus>(FilterStatus.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);

      return;
    }

    setUser(null);
    getUser(selectedTodo.userId).then(setUser);
  }, [selectedTodo]);

  const visibleTodos =
    todos?.filter(todo => {
      if (status === FilterStatus.Active && todo.completed) {
        return false;
      }

      if (status === FilterStatus.Completed && !todo.completed) {
        return false;
      }

      return todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    }) ?? [];

  const isTodoLoading = todos === null;
  const isUserLoading = selectedTodo !== null && user === null;

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
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isTodoLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelectTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id ?? null}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={user}
        isUserLoading={isUserLoading}
        onClose={() => setSelectedTodo(null)}
      />
    </>
  );
};
