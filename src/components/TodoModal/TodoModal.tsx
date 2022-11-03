import { FC, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Prop {
  currentTodo: Todo;
  isUserLoaded: boolean;
  setIsUserLoaded: (value: boolean) => void;
  setTodoId: (value: number) => void;
}

export const TodoModal: FC<Prop> = ({
  currentTodo,
  isUserLoaded,
  setIsUserLoaded,
  setTodoId: handleCloseModal,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const {
    title,
    id,
    completed,
  } = currentTodo;

  useEffect(() => {
    const getUserFromServer = async (userId: number) => {
      const foundUser = await getUser(userId);

      setUser(foundUser);

      setIsUserLoaded(false);
    };

    getUserFromServer(currentTodo.userId);
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                handleCloseModal(0);

                setIsUserLoaded(true);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

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
};
