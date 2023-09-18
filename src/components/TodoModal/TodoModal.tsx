import React, { useLayoutEffect, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  activeTodo: Todo | null,
  onModalToggle: () => void,
  onActiveTodoSet: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  activeTodo,
  onModalToggle,
  onActiveTodoSet,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = activeTodo ? activeTodo.userId : null;

  useLayoutEffect(() => {
    if (!userId) {
      return;
    }

    setIsLoading(true);

    getUser(userId)
      .then(setUser)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCloseModal = () => {
    onActiveTodoSet(null);
    onModalToggle();
    setUser(null);
  };

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
              {`Todo #${activeTodo?.id}`}
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
              {activeTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !activeTodo?.completed,
                  'has-text-success': activeTodo?.completed,
                })}
              >
                {activeTodo?.completed
                  ? 'Done'
                  : 'Planned'}
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
