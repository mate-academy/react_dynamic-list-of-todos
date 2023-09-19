import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectTodo: Todo | null,
  setSelectTodo: (todo: Todo | null) => void
};
export const TodoModal: React.FC<Props> = ({
  selectTodo,
  setSelectTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setSelectedUser(null);
    setSelectTodo(null);
  };

  useEffect(() => {
    if (selectTodo?.userId) {
      setIsLoading(true);
      getUser(selectTodo?.userId)
        .then((user) => setSelectedUser(user))
        .catch(() => {
          // eslint-disable-next-line
          console.log('Error loading todos')
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

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
              {`Todo #${selectTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={closeModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
