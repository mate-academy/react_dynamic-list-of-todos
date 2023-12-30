import React, { useState, useEffect, SetStateAction } from 'react';
// import { getUsers } from '../../services/getUsers';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';
import { getUser } from '../../api';

interface Props {
  todoCard: Todo | undefined;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>
  setIconId: React.Dispatch<SetStateAction<number>>
}

export const TodoModal: React.FC<Props> = ({
  todoCard,
  setIsModalOpen,
  setIconId,
}) => {
  const [selectedUser, setsSelectedUser] = useState<User>();
  const [isUserLoad, setIsUserLoad] = useState(false);

  useEffect(() => {
    setIsUserLoad(true);
    getUser(todoCard?.userId).then((user) => {
      setsSelectedUser(user);
    }).finally(() => setIsUserLoad(false));
  }, [todoCard]);

  const handleCloseCard = () => {
    setIsModalOpen(false);
    setIconId(0);
  };

  return (

    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isUserLoad ? (
        <>
          <Loader />
        </>

      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todoCard?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseCard}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoCard?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todoCard?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Done</strong>
              )}
              {' by '}
              <a key={todoCard?.userId} href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>

            </p>
          </div>
        </div>
      )}
    </div>
  );
};
