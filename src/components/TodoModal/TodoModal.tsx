import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null,
  handleCloseModal: () => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleCloseModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [errorMessage, setErrorMessage] = useState('');
  const [updateAt, setUpdateAt] = useState(new Date());

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(userFromServer => setUser(userFromServer))
        .catch(() => setErrorMessage('Try again later'))
        .finally(() => setIsLoading(false));
    }
  }, [updateAt]);

  function reload() {
    setUpdateAt(new Date());
    setErrorMessage('');
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {errorMessage && (
        <p className="notification is-danger">
          {errorMessage}
          <button type="button" onClick={reload}>
            Reload
          </button>
        </p>
      )}

      {isLoading ? (
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
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-danger': !selectedTodo?.completed,
                  'has-text-success': selectedTodo?.completed,
                })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
