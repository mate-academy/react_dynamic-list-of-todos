import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  modalClose: React.Dispatch<React.SetStateAction<boolean>>
};

export const TodoModal: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
    userId,
  },
  modalClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const userName = user?.name;

  useEffect(() => {
    setLoading(true);

    getUser(userId).then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  const closeModal = () => {
    setLoading(false);
    modalClose(false);
  };

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
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {userName}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
