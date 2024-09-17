import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface TodoModalProps {
  modal: boolean;
  todo: Todo | null;
  closeModal: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  modal,
  todo,
  closeModal,
}) => {
  const [userModal, setUserModal] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId).then(user => {
        setUserModal(user);
        setLoading(false);
      });
    }
  }, [todo]);

  const { id, title, completed } = todo || {};

  if (!modal || !todo) {
    return null;
  }

  return (
    <div
      className={classNames('modal', { 'is-active': modal })}
      data-cy="modal"
    >
      <div className="modal-background" onClick={closeModal} />

      {loading ? (
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
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${userModal?.email}`}>{userModal?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
