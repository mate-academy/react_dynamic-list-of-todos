import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  handleCloseModal: () => void;
  selectedTodo: Todo;
}

export const TodoModal: FC<TodoModalProps> = ({
  handleCloseModal,
  selectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const {
    title,
    completed,
    userId,
    id,
  } = selectedTodo;

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      setUser(await getUser(userId));
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedTodo]);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
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
              aria-label="Mute volume"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          {error
            ? (
              <p style={{
                display: 'block',
                padding: '20px',
                width: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
                color: 'darkred',
              }}
              >
                Something went wrong! 🗿
              </p>
            )
            : (
              <div className="modal-card-body">
                <p
                  className="block"
                  data-cy="modal-title"
                >
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong className={classNames(
                    'has-text-danger',
                    { 'has-text-success': completed },
                  )}
                  >
                    {completed
                      ? 'Done'
                      : 'Planned'}
                  </strong>

                  {' by '}

                  {user && (
                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  )}
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
