import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null,
  handleCloseModal: () => void,
};

export const TodoModal: FC<Props> = ({
  todo,
  handleCloseModal,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const loadUser = useCallback(async () => {
    try {
      const loadedUser = await getUser(todo?.userId || 0);

      setUser(loadedUser);
    } catch (error) {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return hasError ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-danger"
            data-cy="modal-header"
          >
            An error occurred when loading the details
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleCloseModal}
            aria-label="close modal"
          />
        </header>
      </div>
    </div>
  ) : (
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
              aria-label="close modal"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
