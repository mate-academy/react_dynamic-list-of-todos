import * as React from 'react';
import { useEffect, useState } from 'react';
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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...todos];

    if (filterStatus !== 'all') {
      const isCompleted = filterStatus === 'completed';

      filtered = filtered.filter(todo => todo.completed === isCompleted);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [todos, filterStatus, searchQuery]);

  const handleShowTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
    setSelectedUser(null);

    if (todo) {
      setIsUserLoading(true);
      getUser(todo.userId)
        .then(setSelectedUser)
        .finally(() => setIsUserLoading(false));
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onShowTodo={handleShowTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={() => handleShowTodo(null)}
        />
      )}
    </>
  );
};
