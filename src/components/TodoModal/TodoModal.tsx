import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  onClose: (selected: null) => void;
  onError: (message: string) => void;
  errorMessage: string;
};

export const TodoModal: React.FC<Props> = React.memo(function TodoModal({
  todo,
  onClose,
  onError,
  errorMessage,
}) {
  const [user, setUser] = useState<User>();
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId)
        .then(author => {
          setRendering(false);
          setUser(author);
        })
        .catch(onError);
    } else {
      setRendering(false);
    }
  }, [todo, onError]);

  return (
    errorMessage ||
    (todo !== null && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {rendering ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => onClose(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    ))
  );
});
