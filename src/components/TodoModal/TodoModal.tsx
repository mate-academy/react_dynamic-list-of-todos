import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    if (selectedTodo) {
      const loadUser = async () => {
        setLoadingUser(true);
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${selectedTodo.userId}`,
          );
          const userData = await response.json();

          setUser(userData);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching user data:', error);
        } finally {
          setLoadingUser(false);
        }
      };

      loadUser();
    }
  }, [selectedTodo]);

  return (
    <div className={`modal ${selectedTodo ? 'is-active' : ''}`} data-cy="modal">
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
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  selectedTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
