import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo | null;
  onResetTodo: (Todo: null) => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  onResetTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [hasUserError, setHasError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (todo) {
          const currentUser = await getUser(todo.userId);

          setUser(currentUser);
        }

        setIsUserLoaded(true);
      } catch {
        setHasError(true);
        setIsUserLoaded(true);
      }
    };

    fetchUser();
  }, [todo]);

  const handleReset = () => {
    onResetTodo(null);
  };

  const { id, title, completed } = todo ?? {};

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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close modal"
              onClick={handleReset}
            />
          </header>

          <div className="modal-card-body">
            {hasUserError ? (
              <div className="has-text-danger">Error loading todo</div>
            ) : (
              <>
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong className={`has-text-${completed ? 'success' : 'danger'}`}>
                    {completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {user && user.name}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
