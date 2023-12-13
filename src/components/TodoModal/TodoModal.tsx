import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [findedUser, setFindedUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getUser(todo.userId)
      .then(setFindedUser)
      .catch(() => (
        // eslint-disable-next-line no-alert
        alert('Error during user reciving 😥')
      ))
      .finally(() => setIsLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
              aria-label="delete"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {
                  todo.completed
                    ? 'Done'
                    : 'Planned'
                }
              </strong>

              {' by '}

              <a href={`mailto:${findedUser?.email}`}>
                {findedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
