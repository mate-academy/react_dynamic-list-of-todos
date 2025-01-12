import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null;
  user: User | null;
  onReset: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  onReset,
  setUser,
}) => {
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsTodoLoading(true);
    if (todo) {
      getUser(todo.userId)
        .then(setUser)
        .catch(error => setErrorMessage(error.message))
        .finally(() => setIsTodoLoading(false));
    }
  }, [todo, setUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isTodoLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onReset}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
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
      {errorMessage && <p className="message is-danger">{errorMessage}</p>}
    </div>
  );
};
