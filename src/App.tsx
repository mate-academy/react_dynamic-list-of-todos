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
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const handleSelectTask = (task: Todo) => {
    setSelectedTask(task);
    setSelectedUser(null);
    setIsUserLoading(true);
    getUser(task.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setSelectedUser(null);
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                onQueryChange={setQuery}
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTask={selectedTask}
                  onSelectTask={handleSelectTask}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTask && (
        <TodoModal
          task={selectedTask}
          user={selectedUser}
          loading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
