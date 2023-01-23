import { FC, useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
  onClose: () => void,

};

export const TodoModal: FC<Props> = ({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isUserLoadingError, setIsUserLoadingError] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);

    getUser(selectedTodo.id)
      .then((loadedUser) => setUser(loadedUser))
      .catch(() => setIsUserLoadingError(true))
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo.id]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${selectedTodo.id}`}
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
            {selectedTodo.title}
          </p>

          {isUserLoading
            ? <Loader />
            : (
              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                {selectedTodo.completed
                  ? <strong className="has-text-danger">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                <span> by </span>

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            )}

          {isUserLoadingError && (
            <p>Error occured while loading user</p>
          )}
        </div>
      </div>
    </div>
  );
};
