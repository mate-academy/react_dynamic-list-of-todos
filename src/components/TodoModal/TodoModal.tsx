import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo,
  onClose: () => void,
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectedTodo, onClose } = props;
  const {
    id,
    title,
    userId,
    completed,
  } = selectedTodo;

  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setIsError(false);

      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              aria-label="close a modal"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {!isError && user ? (
              <p className="block" data-cy="modal-user">
                <strong className={cn({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
                >
                  {completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            ) : (
              <p className="has-text-danger">
                Can not to load a user
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
