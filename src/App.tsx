import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { getTodos, getUsers } from './api';
import { useMemo } from 'react';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      Promise.all([getTodos(), getUsers()])
        .then(([loadedTodos, loadedUsers]) => {
          setTodos(loadedTodos);
          setUsers(loadedUsers);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  const filterTodos = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return todos.filter(todo => {
      const filteredByQuery = todo.title.toLowerCase().includes(lowerCaseQuery);

      switch (filter) {
        case 'active':
          return filteredByQuery && !todo.completed;
        case 'completed':
          return filteredByQuery && todo.completed;
        default:
          return filteredByQuery;
      }
    });
  }, [query, todos, filter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    setFilter(newValue);
  };

  const handleTodoSelect = (todo: Todo) => {
    setModalLoading(true);
    setSelectedTodo(todo);

    setTimeout(() => {
      setModalLoading(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={handleQueryChange}
                onClearQuery={clearQuery}
                filter={filter}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filterTodos}
                  users={users}
                  onTodoSelect={handleTodoSelect}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          users={users}
          onClose={handleCloseModal}
          loading={modalLoading}
        />
      )}
    </>
  );
};
