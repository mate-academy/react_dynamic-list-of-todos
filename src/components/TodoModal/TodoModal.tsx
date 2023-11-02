import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  setSelectedTodo: (arg0: Todo | undefined) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  setSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    if (todo) {
      getUser(todo?.userId)
        .then(userFromServer => {
          setUser(userFromServer);
          setIsLoading(false);
        })
        .catch(error => {
          setErrorMessage(error.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      setErrorMessage('No selected todo');
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && !user
        && <Loader />}
      {!isLoading && !errorMessage
        && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setSelectedTodo(undefined)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={`has-text-${todo.completed
                    ? 'success'
                    : 'danger'}`}
                >
                  {todo.completed
                    ? 'Done'
                    : 'Planned'}
                </strong>

                {' by '}

                {!isLoading && user
                && (
                  <a href={`mailto: ${user.email}`}>
                    {user.name}
                  </a>
                )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
