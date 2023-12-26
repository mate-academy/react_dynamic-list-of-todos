import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import 'bulma/css/bulma.css';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { ErrorMessage } from '../ErrorMasage/ErorMasage';

type Props = {
  selectedTodo: Todo | null
  onModalClose: (val: Todo | null) => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onModalClose = () => { },
}) => {
  const [user, setUser] = useState<User>();
  const [updateAt, setUpdateAt] = useState(new Date());
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [userId, setUserId] = useState<number | null>(
    selectedTodo ? selectedTodo.userId : null,
  );

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then(setUser)
        .catch(() => setUserErrorMessage('User not found'))
        .finally(() => setUserId(null));
    }
  }, [userId, updateAt]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userId ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
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
              {selectedTodo?.title}
            </p>

            {userErrorMessage || !user ? (
              <ErrorMessage
                message={userErrorMessage}
                setErrorMessage={setUserErrorMessage}
                onReload={setUpdateAt}
              />
            ) : (
              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={classNames('',
                    { 'has-text-danger': !selectedTodo?.completed },
                    { 'has-text-success': selectedTodo?.completed })}
                >
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
                </strong>

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
