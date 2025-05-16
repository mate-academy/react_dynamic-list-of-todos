import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error fetching todos:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(selectedTodo?.id === todo.id ? null : todo);
  };

  const handleStatusChange = (newStatus: FilterStatus) => {
    setFilterStatus(newStatus);
  };

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  // Filter todos based on status and search query
  const filteredTodos =
    todos?.filter(todo => {
      if (filterStatus === 'active' && todo.completed) {
        return false;
      }

      if (filterStatus === 'completed' && !todo.completed) {
        return false;
      }

      if (
        searchQuery &&
        !todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    }) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                searchQuery={searchQuery}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader loading={loading} />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleTodoSelect}
                  selectedTodoId={selectedTodo?.id}
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
          setUsers={setUsers}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
