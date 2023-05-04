import React, { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todoSelected: Todo
  resetModal: () => void
};

export const TodoModal: React.FC<Props> = (
  {
    todoSelected,
    resetModal,
  },
) => {
  const [user, setUser] = useState<User>();
  const [checkedUserId, setCheckedUserId] = useState<number>(
    todoSelected.userId,
  );

  useMemo(() => {
    getUser(checkedUserId).then(setUser);
  }, [checkedUserId]);

  useMemo(() => {
    setCheckedUserId(todoSelected.userId);
  }, [todoSelected]);

  return (
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
              {`Todo #${todoSelected.id}`}
            </div>

            <button
              aria-label="Close button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={resetModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoSelected.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todoSelected.completed ? (
                <strong className={classNames({
                  'has-text-success': todoSelected.completed,
                })}
                >
                  Done
                </strong>
              ) : (
                <strong className={classNames({
                  'has-text-danger': !todoSelected.completed,
                })}
                >
                  Planned
                </strong>
              )}
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
