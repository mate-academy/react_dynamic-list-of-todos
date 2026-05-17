import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import cn from 'classnames';

type Props = {
  selectedTodo: Todo | null;
  onClickHideModal: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onClickHideModal,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(selectedTodo?.userId ?? 0)
      .then(setSelectedUser)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching user:', error);
      })
      .finally(() => setLoading(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
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
              onClick={onClickHideModal}
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

              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
