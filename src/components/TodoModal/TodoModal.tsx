import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null;
  selectTodoClose?: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  selectTodoClose = () => {},
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    setUser(null);
    setError(null);

    const loadUser = async () => {
      try {
        setLoader(true);
        const loadedUser = await getUser(todo.userId);

        setUser(loadedUser);
      } catch (e) {
        setError('Failed to load user details');
      } finally {
        setLoader(false);
      }
    };

    loadUser();
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loader && <Loader />}
      {error && <p className="has-text-danger">{error}</p>}

      {!loader && !error && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodoClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
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
};
