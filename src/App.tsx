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
import { Filter } from './types/Filter';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoad, setIsUserLoad] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  const visibleTodos = filteredTodos.filter(todo =>
    todo.title.toLocaleLowerCase().includes(query.toLowerCase()),
  );

  const selectedTodo = selectedTodoId
    ? todos.find(todo => todo.id === selectedTodoId) || null
    : null;

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodoId(prev => (prev === todoId ? null : todoId));
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    setIsUserLoad(true);

    getUser(selectedTodo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsUserLoad(false));
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={setFilter}
                onQueryChange={setQuery}
                onDeleteQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onSelectedTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoad}
          onClose={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};
