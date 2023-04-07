import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({ todo, setSelectedTodo }) => {
  const { id, title, userId } = todo;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUser = async () => {
    try {
      const user = await getUser(userId);

      setCurrentUser(user);
    } catch {
      setErrorMessage('User not found');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {currentUser && (
              <div className="modal-card">
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    {`Todo #${id}`}
                  </div>

                  <button
                    aria-label="Close modal"
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

                  {errorMessage ? (
                    <p>{errorMessage}</p>
                  ) : (
                    <p className="block" data-cy="modal-user">
                      <strong
                        className={classNames({
                          'has-text-danger': !todo.completed,
                          'has-text-success': todo.completed,
                        })}
                      >
                        {todo.completed ? 'Done' : 'Planned'}
                      </strong>

                      {' by '}

                      <a href={`mailto:${currentUser?.email}`}>
                        {currentUser?.name}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
