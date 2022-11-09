import React, { useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (arg: null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo, setSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    id, userId, title, completed,
  } = selectedTodo;

  const getUserFromServer = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch {
      throw new Error('There is not found chosen user');
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
              onClick={() => (
                setSelectedTodo(null)
              )}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

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
