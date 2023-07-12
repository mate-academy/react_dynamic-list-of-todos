import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

interface TodoModalProps {
  todo: Todo;
  /* eslint-disable */

  users: User[];
  onCloseTodoModal: () => void;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  onCloseTodoModal,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (todo.userId) {
          const response = await fetch(
            `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${todo.userId}.json`,
          );
          const userData = await response.json();

          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close"
              onClick={onCloseTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                <strong className={`has-text-${todo.completed ? 'success' : 'danger'}`}>
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
