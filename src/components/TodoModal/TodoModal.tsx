import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  deleteTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, deleteTodo }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User>({} as User);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError('');
    getUser(todo.userId)
      .then(u => {
        setUser(u);
      })
      .catch(() => setError('Failed to load user'))
      .finally(() => setLoader(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loader && <Loader />}

      {!loader && error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              // eslint-disable-next-line max-len
              className="modal-card-title has-text-weight-medium has-text-danger"
              data-cy="modal-header"
            >
              Помилка
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                deleteTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        </div>
      )}

      {!loader && !error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                deleteTodo(null);
              }}
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

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
