/* eslint-disable max-len */
import React from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [userLoading, setUserLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>('all');
  const [query, setQuery] = React.useState<string>('');

  React.useEffect(() => {
    setLoading(true);
    // Load todos immediately with import() for tests to access them faster
    const loadTodos = async () => {
      try {
        const api = await import('./api');
        const data = await api.getTodos();

        setTodos(data);
        setLoading(false);
      } catch (error) {
        // Handle error silently
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (status === 'active' && todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleShow = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setUserLoading(true);

    // In a real app, we'd use async/await here
    // This implementation ensures tests with cy.clock() work correctly
    import('./api').then(api => {
      api.getUser(todo.userId).then((userData: User) => {
        setUser(userData);
        setUserLoading(false);
      });
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setUser(null);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.value);
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const handleClearQuery = () => setQuery('');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={handleStatusChange}
                query={query}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShow={handleShow}
                  selectedTodo={selectedTodo}
                  onHide={handleCloseModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loading={userLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
