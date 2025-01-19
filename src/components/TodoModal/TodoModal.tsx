import React from 'react';
import { User } from '../../types/User';
import { ToDoInfo } from '../../types/toDoInfo';
import { Loader } from '../Loader';

type Props = {
  loadModal: boolean;
  user: (User & ToDoInfo) | undefined;
  setUserInfo: (
    userId: number,
    title: string,
    complete: boolean,
    taskId: number,
  ) => void;

  handleVisability: (id: number) => void;
  setModalLoad: (param: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  loadModal,
  user,
  setUserInfo,
  handleVisability,
  setModalLoad,
}) => {
  const handle = (taskId: number | undefined) => {
    setUserInfo(0, '', false, 0);
    if (taskId !== undefined) {
      handleVisability(taskId);
      setModalLoad(true);
    }
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loadModal && <Loader />}
      {!loadModal && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{user?.taskId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handle(user?.taskId)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {user?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  user?.complete ? 'has-text-success' : 'has-text-danger'
                }
              >
                {user?.complete ? 'Done' : 'Planned'}
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
