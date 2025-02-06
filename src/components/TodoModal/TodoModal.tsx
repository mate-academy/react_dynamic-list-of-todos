import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  currentTodo: Todo | null;
  user: User | null;
  closeModal: (todoId: number | null) => void;
};
export const TodoModal: React.FC<Props> = ({
  currentTodo,
  user,
  closeModal,
}) => {
  return (
    <div
      className={classNames('modal', { 'is-active': !!currentTodo })}
      data-cy="modal"
    >
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
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => closeModal(currentTodo?.id || null)}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
