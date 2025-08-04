import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selected: Todo;
  onDelete: () => void;
};

export const TodoModal: React.FC<Props> = ({ selected, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selected.userId)
      .then(x => setUser(x))
      .finally(() => setIsLoading(false));
  }, [selected.userId]);

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
              Todo #{selected.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onDelete();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selected.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selected.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {!selected.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
