import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  isOpened: boolean;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, isOpened, closeModal }) => {
  const [userData, setUserData] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = () => {
      getUser(todo.userId)
        .then((userData) => {
          console.log(`userData: ${userData}`);
          setUserData(userData);
        })
        .finally(() => setIsLoading(false));
    };

    fetchUser();
  }, [todo.userId]);

  return (
    <div className={isOpened ? "modal is-active" : "modal"} data-cy="modal">
      <div className="modal-background" />
      {isOpened && (
        <div className="modal-card">
          <header className="modal-card-head" data-cy>
            <div className="modal-card-title has-text-weight-medium" data-cy="modal-header">
              {`Todo #${todo.id}`}
            </div>
            <button
              type="button"
              data-cy="modal-close"
              className="delete"
              onClick={closeModal}
            />
          </header>
          <div className="modal-card-body">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">{todo.title}</p>
              <p className="block" data-cy="modal-user">
                <strong className={todo.completed ? "has-text-success" : "has-text-danger"}>
                  {todo.completed ? "Done" : "Planned"}
                </strong>
                {' by '}
                <span>{userData?.name}</span>
              </p>
            </>
          )}
        </div>
        </div>
      )}
    </div>
  );
};
