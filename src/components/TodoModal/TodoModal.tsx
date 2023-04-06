import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  closeModal: () => void;
  todo?: Todo;
};

export const TodoModal: React.FC<Props> = (props) => {
  const { closeModal, todo } = props;

  const [user, setUsers] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (todo?.userId) {
      getUser(todo?.userId)
        .then(setUsers)
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
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
                {todo?.title}
              </p>

              {user && (
                <p className="block" data-cy="modal-user">
                  {todo?.completed
                    ? (<strong className="has-text-success">Done</strong>)
                    : (<strong className="has-text-danger">Planned</strong>)}

                  {' by '}

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
    </div>
  );
};
