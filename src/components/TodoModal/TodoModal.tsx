import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Maybe } from '../../types/Maybe';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onClose: (id: Maybe<Todo>) => void;
}

export const TodoModal: FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<Maybe<User>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(todo.userId)
      .then(userFromServer => setUser(userFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
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
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
