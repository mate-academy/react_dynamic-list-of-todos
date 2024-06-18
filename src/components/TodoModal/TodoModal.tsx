import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoWithUser extends Todo {
  user: User;
}

type Props = {
  todoWithUser: TodoWithUser | null;
  loadingUser: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todoWithUser,
  loadingUser,
  onClose,
}) => {
  if (!todoWithUser && !loadingUser) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo {todoWithUser ? `#${todoWithUser.id}` : ''}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          {loadingUser ? (
            <Loader />
          ) : (
            todoWithUser && (
              <>
                <p className="block" data-cy="modal-title">
                  {todoWithUser.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      todoWithUser.completed
                        ? 'has-text-success'
                        : 'has-text-danger'
                    }
                  >
                    {todoWithUser.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${todoWithUser.user.email}`}>
                    {todoWithUser.user.name}
                  </a>
                </p>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};
