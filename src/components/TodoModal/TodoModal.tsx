import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

interface TodoModalProps {
  selectedTodo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  isOpen,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);
      setIsLoading(false);

      return;
    }

    setUser(null);
    setIsLoading(true);

    getUser(selectedTodo.userId)
      .then(data => setUser(data))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

  return isOpen ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {isLoading || !selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
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
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': selectedTodo.completed,
                  'has-text-danger': !selectedTodo.completed,
                })}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  ) : null;
};
