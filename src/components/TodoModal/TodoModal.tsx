import React, { useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  setSelectedTodo: (val: null) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  setSelectedTodo,
}) => {
  const {
    id,
    title,
    userId,
    completed,
  } = todo;

  const [user, setUser] = useState<User | null>(null);

  const getUserFromServer = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch (error) {
      throw new Error('User is not found');
    }
  };

  getUserFromServer();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!(user !== null) ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )
                : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
