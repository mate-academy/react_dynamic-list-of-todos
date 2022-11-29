import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo,
  onClose: (id: number | null) => void,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  const [user, setUser] = useState<User | null>(null);

  const toClose = () => {
    onClose(null);
  };

  useEffect(() => {
    getUser(userId)
      .then(userFromServer => setUser(userFromServer));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <i
              aria-label="text"
              role="button"
              tabIndex={0}
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={toClose}
              onKeyUp={toClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
