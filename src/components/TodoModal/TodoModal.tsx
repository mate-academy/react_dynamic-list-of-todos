import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null;
  clicked: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, clicked, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setLoading(true);
      getUser(todo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todo]);

  if (!clicked) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        {loading ? (
          <Loader />
        ) : (
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {'Todo #' + todo?.id}
              </div>
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo?.completed && (
                  <strong className="has-text-success">Done</strong>
                )}
                {!todo?.completed && (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
