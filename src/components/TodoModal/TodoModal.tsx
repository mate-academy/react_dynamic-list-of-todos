import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null,
  setSelectedTodo: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = (
  { selectedTodo, setSelectedTodo },
) => {
  const [loading, setLoading] = useState(true);
  const hasSelectedTodo = selectedTodo !== null;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);

    if (selectedTodo !== null) {
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(() => { })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && (
        <Loader />
      )}

      {!loading && (

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
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {hasSelectedTodo && (
                selectedTodo.title
              )}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {!selectedTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>

              )}

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
