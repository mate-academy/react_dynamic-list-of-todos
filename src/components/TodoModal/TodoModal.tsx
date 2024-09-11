import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { getUser } from '../../api';

type Props = {
  currentTodo: Todo;
  user: User | null;
  onClose: () => void;
  cardLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  onClose = () => {},
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cardLoading, setCardLoading] = useState(true);

  useEffect(() => {
    setCardLoading(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => {
          setCardLoading(false);
        });
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {cardLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={onClose}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames('has-text-success', {
                  'has-text-danger': !currentTodo.completed,
                })}
              >
                {currentTodo.completed === true ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
