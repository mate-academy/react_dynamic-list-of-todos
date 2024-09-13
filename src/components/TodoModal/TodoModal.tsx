import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';

type Props = {
  modal: Todo;
  onCloseModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ modal, onCloseModal }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setModalLoading(true);

    getUser(modal.userId)
      .then(data => setUser({ ...data }))
      .finally(() => setModalLoading(false));
  }, []);

  return (
    <div
      className={classNames('modal', { 'is-active': modal.id !== 0 })}
      data-cy="modal"
    >
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
              Todo #{modal.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={onCloseModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modal.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {modal.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
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
