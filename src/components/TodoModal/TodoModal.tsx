import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  modal: Todo,
  deleteModal: () => void
};

export const TodoModal: React.FC<Props> = ({
  modal,
  deleteModal,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(modal.userId).then(setUser);
  }, [modal]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${modal.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="modal-close"
              onClick={deleteModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modal.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-danger': !modal.completed,
                'has-text-success': modal.completed,
              })}
              >
                {modal.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
