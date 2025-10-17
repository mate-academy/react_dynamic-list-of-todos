import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  onModalCloseClick: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onModalCloseClick }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      setLoading(false);
      setUser(null);

      return;
    }

    setLoading(true);
    setUser(null);

    const ac = new AbortController();

    getUser(todo.userId)
      .then(u => {
        if (!ac.signal.aborted) {
          setUser(u);
        }
      })
      .finally(() => {
        if (!ac.signal.aborted) {
          setLoading(false);
        }
      });

    return () => ac.abort();
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onModalCloseClick} />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={onModalCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                <strong
                  className={cn({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </div>

          <footer className="modal-card-foot is-justify-content-flex-end">
            <button className="button" onClick={onModalCloseClick}>
              Close
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};
