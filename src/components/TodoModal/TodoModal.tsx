import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null,
  setSelectedTodo: (x: Todo | null) => void,
};
export const TodoModal: FC<Props> = ({ todo, setSelectedTodo }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getUser(todo?.userId)
      .then(setSelectedUser)
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
              {`Todo #${todo?.id}`}
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
              {todo?.title}
            </p>

            <p
              className="block"
              data-cy="modal-user"

            >
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames({
                'has-text-success': todo?.completed,
                'has-text-danger': !todo?.completed,
              })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
