import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  handleModalActive: () => void;
  modalTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({
  handleModalActive,
  modalTodo,
}) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const { id, title, completed, userId } = modalTodo;

  useEffect(() => {
    setTimeout(() => {
      getUser(userId)
        .then(setUser)
        .catch(() => setErrorMsg('No response from server. Try again later.'))
        .finally(() => setLoading(false));
    }, 200);
  }, [userId]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading && <Loader />}

        {!loading && userId === user.id && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleModalActive}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href="mailto:Sincere@april.biz">{user.name}</a>
              </p>
            </div>
          </div>
        )}

        {!loading && userId !== user.id && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {errorMsg}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleModalActive}
              />
            </header>
          </div>
        )}
      </div>
    </>
  );
};
