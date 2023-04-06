import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { getErrorMessage } from '../../HELPER_FUNCTIONS';

type Props = {
  selectedTodo: Todo
  onsetSelectedTodo: (todo: null) => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onsetSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorUser, setErrorUser] = useState('');

  const {
    userId,
    id,
    title,
    completed,
  } = selectedTodo;

  useEffect(() => {
    getUser(userId)
      .then(person => setUser(person))
      .catch(error => setErrorUser(getErrorMessage(error)));
  }, [selectedTodo]);

  const inNotUserAndError = !user && !errorUser;
  const isError = errorUser.length > 0;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {inNotUserAndError ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              aria-label="clear"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onsetSelectedTodo(null);
              }}

            />
          </header>

          <div className="modal-card-body">
            <p className="block has-text-danger" data-cy="modal-title">
              {errorUser
                ? ('Failed to fetch user from server')
                : title}
            </p>

            {isError || (
              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames(
                    { 'has-text-danger': !completed },
                    { 'has-text-success': completed },
                  )}
                >
                  {completed ? 'Done' : 'Planned'}
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
