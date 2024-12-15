import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo | null;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTodo?.userId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .catch(() => {
        setError('Failed to load user data. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={() => setSelectedTodo(null)} />

      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className="notification is-danger">{error}</div>
      )}

      {!isLoading && !error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': selectedTodo?.completed,
                  'has-text-danger': !selectedTodo?.completed,
                })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {selectedUser && (
                <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
