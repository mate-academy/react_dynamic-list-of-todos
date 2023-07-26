import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { TodosContext } from '../../TodosContext';
import { TodoWithUser } from '../../types/TodoWithUser';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [todoWithUser, setTodoWithUser] = useState<TodoWithUser | null>(null);
  const { todoOnView, setTodoOnView } = useContext(TodosContext);

  useEffect(() => {
    if (todoOnView) {
      setIsUserLoading(true);
      getUser(todoOnView.userId)
        .then(user => setTodoWithUser({ ...todoOnView, user }))
        .finally(() => {
          setIsUserLoading(false);
        });
    }
  }, []);

  const reset = () => {
    setTodoOnView(null);
    setTodoWithUser(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading && <Loader />}

      {todoWithUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoWithUser.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={reset}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoWithUser.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !todoWithUser.completed,
                  'has-text-success': todoWithUser.completed,
                })}
              >
                {todoWithUser.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${todoWithUser.user.email}`}>
                {todoWithUser?.user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
