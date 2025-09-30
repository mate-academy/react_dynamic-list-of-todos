/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  selectedTodo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    let cancelled = false;

    setUser(null);
    setLoading(true);

    getUser(selectedTodo.userId)
      .then(userData => {
        if (!cancelled) {
          setUser(userData);
        }
      })
      .catch(err => {
        console.error('Failed to load user:', err);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
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
            aria-label="Close modal"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {loading && <Loader />}

            {!loading && user && (
              <>
                <strong
                  className={classNames({
                    'has-text-success': selectedTodo.completed,
                    'has-text-danger': !selectedTodo.completed,
                  })}
                >
                  {selectedTodo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
