import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMasage, setErrorMasage] = useState('');

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [currentUserDetails, setCurrentUserDetails] = useState<User | null>(
    null,
  );
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMasage('Error loading todos'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    let tempTodos = todos;

    if (filterStatus === 'active') {
      tempTodos = tempTodos.filter(todo => !todo.completed);
    } else if (filterStatus === 'completed') {
      tempTodos = tempTodos.filter(todo => todo.completed);
    }

    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase().trim();

      tempTodos = tempTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return tempTodos;
  }, [todos, filterStatus, searchQuery]);

  const handleStatusChange = (status: FilterStatus) => {
    setFilterStatus(status);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleShowTodoDetails = async (todo: Todo) => {
    setSelectedTodo(todo);
    setCurrentUserDetails(null);
    setErrorMasage('');

    try {
      setLoadingUser(true);
      const user = await getUser(todo.userId);

      setCurrentUserDetails(user);
    } catch (error) {
      setCurrentUserDetails(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setCurrentUserDetails(null);
    setErrorMasage('');
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
                searchQuery={searchQuery}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && filteredTodos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onShowDetails={handleShowTodoDetails}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                />
              )}

              {errorMasage && (
                <div className="notification is-danger">{errorMasage}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={currentUserDetails}
          onClose={handleCloseModal}
          isLoadingUser={loadingUser}
        />
      )}
    </>
  );
};
