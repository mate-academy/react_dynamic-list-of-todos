import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  setSelectedTask: (taskId: number | null) => void;
  todo: Todo | undefined;
};

const STATUS = {
  resolved: 'resolved',
  rejected: 'rejected',
  idle: 'idle',
  pending: 'pending',
} as const;

export const TodoModal: React.FC<Props> = ({ setSelectedTask, todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userStatus, setUserStatus] = useState<string>(STATUS.idle);
  const [error, setError] = useState('');

  useEffect(() => {
    setUserStatus(STATUS.pending);
    const loadData = () => {
      getUser(todo?.userId)
        .then(data => {
          setUser(data);
          setUserStatus(STATUS.resolved);
        })
        .catch(() => {
          setUserStatus(STATUS.rejected);
          setError('User cant be found. Please try again later');
        });
    };

    loadData();
  }, [todo]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div
          className="modal-background"
          onClick={() => setSelectedTask(null)}
        />

        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTask(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>
            {userStatus === STATUS.pending && <Loader />}
            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  todo?.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {error === '' ? (
                <a
                  href={
                    user?.email
                      ? `mailto:${user?.email}`
                      : 'mailto:Sincere@april.biz'
                  }
                >
                  {user?.name}
                </a>
              ) : (
                <p>{error}</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
