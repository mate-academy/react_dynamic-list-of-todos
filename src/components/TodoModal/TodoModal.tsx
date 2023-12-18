import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo,
  setSelectedTodo: (t: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => setErrorMessage('There is no user'))
      .finally(() => setLoading(false));
  }, [selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
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
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="notification is-danger is-light">
          <strong>{errorMessage}</strong>
        </div>
      )}
    </div>
  );
};
