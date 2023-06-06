import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export type TodoM = {
  onCloseModal: () => void,
  todo: Todo,
  getUser: (userId: number) => void,
  loading: boolean,
};

export const TodoModal: React.FC<TodoM> = ({
  onCloseModal: onCross,
  todo,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoade] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(todo.userId);

      setUserData(user);
      setIsUserLoade(true);
    };

    fetchUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCross()}
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

              <a href={`mailto:${userData?.email}`}>
                {userData?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
