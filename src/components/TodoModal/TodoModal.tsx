import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';
import { Loader } from '../Loader';
interface Props {
  todo: Todo;
  onIconClick: () => void;
}
export const TodoModal: React.FC<Props> = ({ todo, onIconClick }) => {
  const [user, setUser] = React.useState<User | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);
  const getUserData = () => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(us => setUser(us))
      .finally(() => setIsLoading(false));
  };

  useEffect(getUserData, [todo]);

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
              onClick={() => onIconClick()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
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
