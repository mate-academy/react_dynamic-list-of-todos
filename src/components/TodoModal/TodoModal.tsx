import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import cn from 'classnames';

type TodoModalProps = {
  todo: Todo;
  onModalClose: () => void;
};

export const TodoModal = ({ todo, onModalClose }: TodoModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    setErrorMessage('');
    getUser(todo.userId)
      .then(setUser)
      .catch(err => setErrorMessage(`Error fetching user: ${err}`))
      .finally(() => setIsLoading(false));
  }, [todo.userId]);

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
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onModalClose}
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

              {!errorMessage ? (
                <>
                  {' by '}

                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </>
              ) : (
                errorMessage
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
