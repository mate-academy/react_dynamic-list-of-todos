import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  onHideModal: () => void
};

export const TodoModal: React.FC<Props> = ({ todo, onHideModal }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const loadUser = async () => {
    if (todo.userId) {
      const user = await getUser(todo.userId);

      setCurrentUser(user);
    }
  };

  useEffect(() => {
    loadUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { !currentUser ? (
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
              onClick={onHideModal}
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

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
