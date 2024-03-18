import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo: { id, userId, title, completed },
  setSelectedTodo,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    getUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId, loading]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && !user ? (
        <Loader />
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
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
