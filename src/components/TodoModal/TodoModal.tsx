import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo,
  clearSelectedTodo: () => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  clearSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMesage, setErrorMesage] = useState<string>('');

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then((response) => setUser(response))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo?.userId)
        .then(userFromServer => {
          setUser(userFromServer);
        })
        .catch(error => {
          setErrorMesage(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && !user
        && <Loader />}

      {!isLoading && !errorMesage
      && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={clearSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {!isLoading && user ? (
                <span>
                  {' by '}
                  <a href={`mailto:${user.email}`}>
                    {user.name}
                  </a>
                </span>
              ) : (
                'Author not found'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
