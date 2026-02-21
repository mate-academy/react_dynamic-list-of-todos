import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Todo } from './types/Todo';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    getTodos()
      .then(data => {
        if (mounted) {
          setTodos(data);
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);
  const filtered = todos
    .filter(todo =>
      filter === 'all'
        ? true
        : filter === 'completed'
          ? todo.completed
          : !todo.completed,
    )
    .filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleShow = (todo: Todo) => {
    setSelectedUser(null);
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setUserLoading(true);
    getUser(todo.userId)
      .then(u => setSelectedUser(u))
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setUserLoading(false));
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                filter={filter}
                onFilterChange={setFilter}
                query={query}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>
            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filtered}
                  onShow={handleShow}
                  onHide={handleClose}
                  selectedTodoId={selectedTodo?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TodoModal
          isOpen={isModalOpen}
          todo={selectedTodo}
          user={selectedUser}
          loading={userLoading}
          onClose={handleClose}
        />
      )}
    </>
  );
};
