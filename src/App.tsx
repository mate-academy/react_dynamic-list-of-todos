import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  // Завантаження всіх todo при старті
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const data = await getTodos();

        setTodos(data);
        setFilteredTodos(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Клік на todo для показу модалки
  const handleModalClick = async (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setLoadingUser(true);
    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch (err) {
    } finally {
      setLoadingUser(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>
          <div className="block">
            <TodoFilter todos={todos} onFilter={setFilteredTodos} />
          </div>
        </div>

        <div className="block">
          {loading ? (
            <Loader />
          ) : (
            <TodoList
              todos={filteredTodos}
              onTodoClick={handleModalClick}
              selectedTodoId={selectedTodo?.id}
            />
          )}
        </div>

        {selectedTodo && (
          <TodoModal
            loading={loadingUser}
            todo={selectedTodo}
            user={selectedUser as User}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};
