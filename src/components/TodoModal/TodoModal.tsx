import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type TodoModalProps = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    let cancelled = false;

    setLoadingUser(true);

    getUser(todo.userId)
      .then(user => {
        if (!cancelled) {
          setUserName(user.name);
          setUserEmail(user.email);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingUser(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

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
              <strong
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${userEmail}`}>{userName}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
