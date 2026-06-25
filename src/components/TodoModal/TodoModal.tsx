import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null;
  setSelectedTodo: (selectTodo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  //#region states
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  //#endregion states

  useEffect(() => {
    if (!selectedTodo) return;

    setIsLoading(true);
    setIsError(null);

    getUser(selectedTodo.userId)
      .then(data => setUser(data))
      .catch(() => setIsError('User is not defind'))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  const { id, title } = selectedTodo;

  const statusText = selectedTodo.completed ? 'Done' : 'Planned';
  const statusClass = selectedTodo.completed
    ? 'has-text-success'
    : 'has-text-danger';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="has-text-danger block">{isError}</div>
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
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
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={statusClass}>{statusText}</strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
