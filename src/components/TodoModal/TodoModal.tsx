import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
interface Props {
  selectedTodo: Todo | null;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      setIsUserLoading(true);
      getUser(selectedTodo.userId)
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setIsUserLoading(false);
        });
    } else {
      setUser(null);
      setIsUserLoading(false);
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading || !selectedTodo || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              <strong
                className={
                  selectedTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
