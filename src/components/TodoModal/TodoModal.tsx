import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { getUser } from '../../api';

type Props = {
  todos: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todos, onClose }) => {
  const [users, setUsers] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!todos) {
      return;
    }

    setLoadingUser(true);

    getUser(todos.userId)
      .then(setUsers)
      .finally(() => {
        setLoadingUser(false);
      });
  }, [todos]);

  if (loadingUser) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <Loader />
      </div>
    );
  }

  if (!users) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head" data-cy="todo">
          <div
            className="modal-card-title has-text-weight-medium "
            data-cy="modal-header"
          >
            Todo #{todos?.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todos?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong
              className={cn(
                'has-text',
                todos?.completed ? 'has-text-success' : 'has-text-danger',
              )}
            >
              {todos?.completed ? 'Done' : 'Planned'}
            </strong>

            {' by '}

            <a href={`mailto:${users.email}`}>{users.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
