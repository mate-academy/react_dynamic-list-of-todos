import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo;
  selectTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, selectTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { completed, title, id } = selectedTodo;

  const todoStatusStyle = completed ? 'success' : 'danger';
  const todoStatus = completed ? 'Done' : 'Planned';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userFromServer = await getUser(selectedTodo.userId);

        setUser(userFromServer);
        setIsLoaded(true);
        setHasError(false);
      } catch {
        setUser(null);
        setHasError(true);
        setIsLoaded(false);
      }
    };

    fetchUser();
  }, []);

  if (hasError) {
    return (
      <span>
        Sorry, we were unable to load your todos at this time. Please try again
        later or contact support if the problem persists.
      </span>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoaded ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              aria-label="modal-close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={`has-text-${todoStatusStyle}`}>
                {todoStatus}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
