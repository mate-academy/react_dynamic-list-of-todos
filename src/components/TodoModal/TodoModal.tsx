import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useLoadedData } from '../../hooks/useLoadedData';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  selectedTodo: Todo | null;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = React.memo(function TodoModal({
  selectedTodo,
  onClose,
}) {
  const { data, isLoading, error, handleLoadData } = useLoadedData<User | null>(
    null,
  );

  useEffect(() => {
    handleLoadData(() => getUser(selectedTodo?.userId || 0));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {error && <p>{error}</p>}

      {isLoading && <Loader />}

      {data && !isLoading && !error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${data.email}`}>{data.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
