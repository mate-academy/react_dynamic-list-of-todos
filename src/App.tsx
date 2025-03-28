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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setFilteredTodos(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = [...todos];

    if (filter !== 'all') {
      const shouldBeCompleted = filter === 'completed';

      filtered = filtered.filter(todo => todo.completed === shouldBeCompleted);
    }

    if (searchQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [filter, searchQuery, todos]);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsLoading(true);
    getUser(todo.userId).then(user => {
      setSelectedUser(user);
      setIsLoading(false);
    });
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {isLoading && <Loader />}
          <TodoList todos={filteredTodos} onShowTodo={handleShowTodo} />
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={() => setSelectedTodo(null)}
          loading={isLoading} // Добавлено свойство loading
        />
      )}
    </div>
  );
};
