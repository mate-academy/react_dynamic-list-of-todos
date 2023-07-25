import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setIsTodoSelected: (value: boolean) => void,
  selectedTodo: Todo | null,
};

export const TodoModal: React.FC<Props> = ({
  setIsTodoSelected,
  selectedTodo,
}) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoInfo, setTodoInfo] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    getUser(selectedTodo?.userId)
      .then(user => setTodoInfo(user))
      .catch(() => setErrorMessage('Error while getting todo info!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading && <Loader />}

      {!loading && !errorMessage && todoInfo !== null
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
                data-cy="modal-close"
                onClick={() => setIsTodoSelected(false)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {
                  selectedTodo?.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>
                }
                {' by '}

                <a href={`mailto:${todoInfo?.email}`}>
                  {todoInfo?.name}
                </a>
              </p>
            </div>
          </div>
        )}

      {errorMessage && (
        <p className="notification is-danger has-text-centered">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
