import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  isShown: boolean;
  setIsShown: (show: boolean) => void;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  isShown,
  setIsShown,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsUserLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo]);

  if (!isShown || !selectedTodo) {
    return null;
  }

  return (
    <div
      className={classNames('modal', { 'is-active': isShown })}
      data-cy="modal"
      key={selectedTodo?.id}
    >
      <div className="modal-background" />

      {isShown &&
        (isUserLoading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{selectedTodo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={() => setIsShown(false)}
                type="button"
                className="delete"
                data-cy="modal-close"
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
                    'has-text-success': selectedTodo?.completed,
                    'has-text-danger': !selectedTodo?.completed,
                  })}
                >
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
