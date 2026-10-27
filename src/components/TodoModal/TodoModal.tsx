import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../services/users';
import { wait } from '../../utils/httpClient';

interface Props {
  enterTodo: Todo;
  onSelectedTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({ enterTodo, onSelectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    wait(1000)
      .then(() => getUser(enterTodo.userId))
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [enterTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader data-cy="loader" />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${enterTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {enterTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': enterTodo.completed,
                  'has-text-danger': !enterTodo.completed,
                })}
              >
                {enterTodo.completed ? `Done` : `Planned`}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
