import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo, User } from '../../types';
import { getUser } from '../../api';

interface Props {
  todo: Todo | null;
  onToggleModal: (todo: Todo | null, isShow: boolean) => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onToggleModal }) => {
  const [pressedTodoUser, setPressedTodoUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (todo !== null) {
      getUser(todo.userId)
        .then(setPressedTodoUser)
        // eslint-disable-next-line no-console
        .catch(console.error)
        .finally(() => setLoadingUser(false));
    }

    return () => {
      setLoadingUser(true);
    };
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onToggleModal(null, false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  todo?.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${pressedTodoUser?.email}`}>
                {pressedTodoUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
