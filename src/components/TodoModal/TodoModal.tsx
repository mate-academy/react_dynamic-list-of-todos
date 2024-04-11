import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';
type Props = {
  todo: Todo;
  unselectTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = React.memo(
  ({ todo, unselectTodo }) => {
    const [user, setUser] = useState<null | User>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      getUser(todo.userId)
        .finally(() => setLoading(false))
        .then(setUser);
    }, []);

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
                Todo #{todo.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => unselectTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
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
    );
  },
);

TodoModal.displayName = 'TodoModal';
