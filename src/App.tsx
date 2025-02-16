/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [todosLoading, setTodoLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(error => {
        /* eslint-disable-next-line no-console */
        console.log('Error fetching todos:', error);
      })
      .finally(() => {
        setTodoLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && !todo.completed) ||
      (selectedStatus === 'completed' && todo.completed);

    const matchesTitle = todo.title
      .trim()
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    return matchesStatus && matchesTitle;
  });

  const handleFilterChange = (status: FilterStatus, query: string) => {
    setSelectedStatus(status);
    setSearchQuery(query);
  };

  const handleTodoSelection = (todo: Todo) => {
    setSelectedTodo(todo);
    getUser(todo.userId)
      .then(user => {
        setCurrentUser(user);
      })
      .catch(error => {
        /* eslint-disable-next-line no-console */
        console.log('Error fetching todos:', error);
      });
  };

  const handleTodoClear = () => {
    setSelectedTodo(null);
    setCurrentUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                selectedStatus={selectedStatus}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {todosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={filteredTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelect={handleTodoSelection}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onTodoClear={handleTodoClear}
          todo={selectedTodo}
          user={currentUser}
        />
      )}
    </>
  );
};
