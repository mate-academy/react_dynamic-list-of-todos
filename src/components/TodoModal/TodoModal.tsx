/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';

interface Props {
  SelectTodoModal: Todo | undefined;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({ SelectTodoModal, closeModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadUser, setLoadUser] = useState(true);

  useEffect(() => {
    if (SelectTodoModal) {
      getUser(SelectTodoModal.userId)
        .then(data => setUser(data))
        .finally(() => setLoadUser(false));
    }
  }, [SelectTodoModal]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo {SelectTodoModal?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {SelectTodoModal?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {SelectTodoModal?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
