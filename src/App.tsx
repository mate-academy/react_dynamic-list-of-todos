import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('all');
  const [inputSearch, setInputSearch] = useState<string>('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);
    setSelectedUser(null);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      sortBy === 'all' ||
      (sortBy === 'completed' && todo.completed) ||
      (sortBy === 'active' && !todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(inputSearch.toLowerCase().trim());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterOption={setSortBy}
                setInputSearch={setInputSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
