import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null;
  selectNewTodo(todo: null): void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, selectNewTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo?.userId)
        .then(userFromServer => {
          setUser(userFromServer);
          setIsLoading(false);
        })
        .catch(newError => setErrorMessage(newError.message))
        .finally(() => setIsLoading(false));
    } else {
      setErrorMessage('No selected todo');
    }
  }, [selectedTodo]);

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
                {`Todo #${selectedTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                onClick={() => selectNewTodo(null)}
                data-cy="modal-close"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={selectedTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {selectedTodo?.completed
                    ? 'Done'
                    : 'Planned'}
                </strong>

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
