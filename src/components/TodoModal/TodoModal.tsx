import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUser } from '../../api';

type TodoModalProps = {
  todo: Todo | null;
  onClose: () => void;
};

type User = {
  id: number;
  name: string;
  email: string;
};


export const TodoModal = ({ todo, onClose }: TodoModalProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todo) {
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const userData = await getUser(todo.userId);
          setUser(userData);
        } catch (error) {
            setError(
              error instanceof Error ? error.message : 'Failed to load user',
            );

        } finally {
            setIsLoading(false);
        }       
      };
      fetchUser();
    }
  }, [todo?.userId]);

  return (
    <div>
      {todo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoading ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{todo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  onClick={onClose}
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={user ? `mailto:${user.email}` : '#'}>{user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
