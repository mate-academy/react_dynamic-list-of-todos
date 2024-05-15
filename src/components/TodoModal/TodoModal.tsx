import React, {useEffect, useState} from 'react';
import { Loader } from '../Loader';
import {Todo} from "../../types/Todo";
import {User} from "../../types/User";
import {getUser} from "../../api";

interface ITodoModal {
  setModal: (value: boolean) => void;
  userId: number;
  todo: Omit<Todo, 'userId'>;
}

export const TodoModal: React.FC<ITodoModal> = ({todo, setModal, userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {id, title, completed} = todo;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleCloseModal = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModal(false);
      }
    };

    document.addEventListener('keydown', handleCloseModal);

    return () => {
      document.removeEventListener('keydown', handleCloseModal);
    };
  }, [setModal]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);

        const res = await getUser(userId);

        setUser(res);
      } catch (err) {
        if (err instanceof Error) {
          window.console.log(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, [userId]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setModal(false);
    }
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleBackdropClick} />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModal(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={`has-text-${completed ? 'success' : 'danger'}`}>
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
