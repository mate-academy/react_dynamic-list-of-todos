import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  onHide: () => void,
};

export const TodoModal: React.FC<Props> = ({ todo, onHide }) => {
  const {
    id,
    userId,
    title,
    completed,
  } = todo;

  const [user, setUser] = useState<User>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserFromApi = async () => {
    try {
      const userFromApi = await getUser(userId);

      setUser(userFromApi);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserFromApi();
  }, []);

  const displayModal = !isLoading && !isError && user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />)}
      {displayModal && (
        <div
          className={cn('modal-card', 'notification', {
            'is-success': completed,
            'is-danger': !completed,
          })}
        >
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              aria-label="close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onHide}
            />
          </header>

          <div className="modal-card-body">
            <p className="block has-text-dark" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              <span className="has-text-dark">{' by '}</span>

              <a className="has-text-success" href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
      {isError && (
        <div className="modal-card notification is-danger">
          <header className="modal-card-head">
            <div className="modal-card-title">
              Error
            </div>
            <button
              aria-label="close-modal-button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onHide}
            />
          </header>

          <article className="modal-card-body">
            <p className="block has-text-dark has-text-weight-medium">
              The error has happened...
            </p>
          </article>
        </div>
      )}
    </div>
  );
};
