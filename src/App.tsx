/* eslint-disable max-len */
// import React from 'react';
// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// import { TodoList } from './components/TodoList';
// import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

// export const App: React.FC = () => {
//   return (
//     <>
//       <div className="section">
//         <div className="container">
//           <div className="box">
//             <h1 className="title">Todos:</h1>

//             <div className="block">
//               <TodoFilter />
//             </div>

//             <div className="block">
//               <Loader />
//               <TodoList />
//             </div>
//           </div>
//         </div>
//       </div>

//       <TodoModal />
//     </>
//   );
// };

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');

  const loadTodos = useCallback(async () => {
    setLoadingTodos(true);
    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      // console.error('Error loading todos:', error);
    } finally {
      setLoadingTodos(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const loadUser = useCallback(async (userId: number) => {
    setLoadingUser(true);
    try {
      const userData = await getUser(userId);

      setSelectedUser(userData);
    } catch (error) {
      // console.error('Error loading user:', error);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const handleSelectTodo = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
      setIsModalOpen(true);
      if (todo) {
        loadUser(todo.userId);
      }
    },
    [loadUser],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const handleClearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (statusFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    return filtered;
  }, [todos, statusFilter, query]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos</h1>

          <div className="block">
            <TodoFilter
              status={statusFilter}
              onStatusChange={setStatusFilter}
              query={query}
              onQueryChange={handleQueryChange}
              onClearQuery={handleClearQuery}
            />
          </div>

          <div className="block">
            {loadingTodos ? (
              <Loader />
            ) : (
              <TodoList todos={filteredTodos} onSelectTodo={handleSelectTodo} />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          loadingUser={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
