import { FC, useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);

  const {
    title,
    completed,
    id,
    userId,
  } = todo;

  useEffect(() => {
    try {
      getUser(userId).then(setUser);
    } catch (error) {
      setUser(null);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card modal-card-body-background-info">
          <header className="modal-card-head has-background-info">
            <div
              className="modal-card-title has-text-weight-medium has-text-white"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
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

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
