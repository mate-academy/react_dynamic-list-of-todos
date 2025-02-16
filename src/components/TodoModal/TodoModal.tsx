import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  onModalClose: () => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ onModalClose, selectedTodo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    setError('');

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [selectedTodo.userId]);

  return (
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
              Todo #{selectedTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              onClick={onModalClose}
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong key={selectedTodo.id} className="has-text-success">
                  Done
                </strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {error ? (
                <span>{error}</span>
              ) : (
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
