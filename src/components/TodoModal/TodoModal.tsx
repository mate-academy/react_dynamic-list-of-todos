import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [loadedInfo, isLoadedInfo] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId)
      .then((userFromTodo) => setUser(userFromTodo))
      .finally(() => isLoadedInfo(true));
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!loadedInfo ? (
        <Loader />
      ) : (user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            >
              Close
            </button>
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                todo.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)
              }
              {' by '}

              <a href={user.email}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )
      )}
    </div>
  );
};
