import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  active: boolean;
  selectedUserId: number | null;
  onClose: () => void;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  active,
  selectedUserId,
  onClose,
  selectedTodo,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUserId !== null) {
      setLoading(true);
      getUser(selectedUserId)
        .then(data => setUser(data))
        .finally(() => setLoading(false));
    }
  }, [selectedUserId]);

  if (!active) {
    return null;
  }

  return (
    <div className={active ? 'modal is-active' : 'modal'} data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
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
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
