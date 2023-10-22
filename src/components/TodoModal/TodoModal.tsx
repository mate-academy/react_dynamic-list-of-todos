import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, setSelectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id, title, completed } = todo;

  useEffect(() => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => {
        throw new Error('Nothing was found!');
      })
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
              {`Todo #${id}`}
            </div>

            <button
              aria-label="close button"
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
              <strong className={classNames({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
