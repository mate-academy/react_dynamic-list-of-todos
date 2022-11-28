import React, {
  useEffect,
  useState,
  memo,
  useCallback,
} from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  onClose: () => void;
  todo: Todo | null;
};

export const TodoModal: React.FC<Props> = memo(({
  onClose,
  todo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(async () => {
    if (todo) {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  const text = useCallback(() => {
    return todo?.completed ? 'Done' : 'Planned';
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
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
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">{text()}</strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
