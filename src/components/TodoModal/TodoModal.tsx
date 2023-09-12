import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';

type TodoModalProps = {
  selectedTodo: Todo
  onClick: () => void
};

export const TodoModal = (
  {
    selectedTodo: {
      id, title, completed, userId,
    }, onClick,
  }: TodoModalProps,
) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const todoStatusClass = `has-text-${completed ? 'success' : 'danger'}`;
  const todoStatusText = completed ? 'Done' : 'Planned';

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [id]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
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
              onClick={onClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={todoStatusClass}>{todoStatusText}</strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
