import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  modalState: Todo | null;
  modalButton: boolean;
  handleClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  modalButton,
  modalState,
  handleClose,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>({} as User);

  useEffect(() => {
    if (modalState) {
      setLoading(true);
      getUser(modalState?.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [modalState, modalState?.id]);

  if (!modalButton) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading || !modalState ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{modalState?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalState?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames('has-text-success', {
                  'has-text-danger': !modalState?.completed,
                })}
              >
                {modalState?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
