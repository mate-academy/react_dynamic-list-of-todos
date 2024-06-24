import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import cn from 'classnames';

type Props = {
  selectedTodo: Todo;
  handleModalChange: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleModalChange,
}) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { userId } = selectedTodo;

    setLoader(true);
    setError(null);
    getUser(userId)
      .then(setCurrentUser)
      .catch(() => {
        setError('Failed to load user data');
      })
      .finally(() => setLoader(false));
  }, [selectedTodo]);

  const { id, title, completed } = selectedTodo;

  return (
    <div
      className={cn('modal', {
        'is-active': selectedTodo !== null,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loader && <Loader />}

      {!loader && !error && (
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
              onClick={() => handleModalChange(null)}
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

              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}

      {!loader && error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Error
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleModalChange(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block has-text-danger" data-cy="modal-error">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
