import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  onClose: (value: undefined) => void;
  post: Todo;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  onClose,
  post: { userId, id, title, completed },
}) => {
  const [user, setUser] = useState<User>();
  const [loaded, setLoaded] = useState(false);

  let name, email;

  const onEscapeEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose(undefined);
    }
  };

  if (user) {
    ({ name, email } = user);
  }

  useEffect(() => {
    getUser(userId).then(result => {
      setUser(result);
      setLoaded(true);
    });

    document.addEventListener('keydown', onEscapeEvent);
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!loaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose(undefined)}
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

              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
