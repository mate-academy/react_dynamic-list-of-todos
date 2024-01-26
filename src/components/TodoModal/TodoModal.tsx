import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  selectTodo: (todoId: number) => void
};

export const TodoModal: React.FC<Props> = ({ todo, selectTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userIsLoaded, setUserIsLoaded] = useState(false);

  const loadUser = async (userId: number) => {
    const userFromServer = await getUser(userId);

    if (userFromServer) {
      setUser(userFromServer);
      setUserIsLoaded(true);
    }
  };

  useEffect(() => {
    if (todo) {
      loadUser(todo.userId);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userIsLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodo(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                )
                : (
                  <strong className="has-text-danger">Planned</strong>
                )}

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
