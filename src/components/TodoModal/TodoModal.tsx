import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isActive = true;

    setUser(null);

    getUser(todo.userId)
      .then(loadedUser => {
        if (isActive) {
          setUser(loadedUser);
        }
      })
      .catch(() => {
        if (isActive) {
          setUser(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, [todo.userId]);

  const loadedUser = user?.id === todo.userId ? user : null;
  const statusText = todo.completed ? 'Done' : 'Planned';
  const statusClass = todo.completed ? 'has-text-success' : 'has-text-danger';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!loadedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >{`Todo #${todo.id}`}</div>

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
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {[
                <strong className={statusClass} key="status">
                  {statusText}
                </strong>,
                ' by ',
                <a href={`mailto:${loadedUser.email}`} key="user">
                  {loadedUser.name}
                </a>,
              ]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
