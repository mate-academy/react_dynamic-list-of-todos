import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  userId: number;
  todo: Todo;
  onResetTodo: (boolean: boolean) => void;
}

export const TodoModal: React.FC<Props> = ({ userId, todo, onResetTodo }) => {
  const [user, setUser] = useState<User>();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser(userId);

      setUser(currentUser);
      setIsUserLoaded(true);
    };

    fetchUser();
  }, []);

  const { id, title, completed } = todo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserLoaded ? (
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
              onClick={() => onResetTodo(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={`has-text-${completed ? 'success' : 'danger'}`}>
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user && user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
