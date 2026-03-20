import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  onModalClose: (value: null) => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onModalClose }) => {
  const [modalLoading, setModalLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    setModalLoading(true);
    getUser(todo.userId).then(UserFromServer => {
      setUserDetails(UserFromServer);
      setModalLoading(false);
    });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onModalClose(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${userDetails?.email}`}>{userDetails?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
