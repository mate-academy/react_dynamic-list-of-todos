import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { SelectedTodo } from '../../types/SelectedTodo';
import { SelectedUser } from '../../types/SelectedUser';
import { getUser } from '../../api';

type Props = {
  selectedTodo: SelectedTodo;
  onSelectTodo: (todo: SelectedTodo) => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onSelectTodo }) => {
  const [user, setUser] = useState<SelectedUser>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getUser(selectedTodo?.userId as number)
      .then(setUser)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {selectedTodo && !loading && !errorMessage ? (
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
              onClick={() => onSelectTodo(null)}
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

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        !errorMessage && loading && <Loader />
      )}
    </div>
  );
};
