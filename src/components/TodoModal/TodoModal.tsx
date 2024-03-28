import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { SetTodo } from '../../interfaces/interfaces';
import { getUser } from '../../api';

type Props = {
  loading: boolean;
  handleCloseModal: () => void;
  user: User | null;
  choseTodo: SetTodo | null;
  usersId: number;
  setUser: (response: User) => void;
  setLoadingUser: (res: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  loading,
  handleCloseModal,
  user,
  choseTodo,
  usersId,
  setUser,
  setLoadingUser,
}) => {
  const status = choseTodo?.completed ? (
    <strong className="has-text-success">Done</strong>
  ) : (
    <strong className="has-text-danger">Planned</strong>
  );

  useEffect(() => {
    getUser(usersId)
      .then(response => {
        setUser(response);
      })
      .finally(() => setLoadingUser(false));
  }, [usersId, setLoadingUser, setUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{choseTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {choseTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {status}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
