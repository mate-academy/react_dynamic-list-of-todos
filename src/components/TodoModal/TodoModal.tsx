import React from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  showTodoId: number;
  isModalActive: boolean;
  todo: Todo | null;
  setIsModalActive: (a: boolean) => void;
  todoOwner: User | null;
  modalLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  showTodoId,
  isModalActive,
  todo,
  setIsModalActive,
  todoOwner,
  modalLoading,
}) => {
  return (
    <>
      {isModalActive && (
        <div
          className={classNames('modal', { 'is-active': showTodoId !== 0 })}
          data-cy="modal"
        >
          <div className="modal-background" />

          {modalLoading ? (
            <Loader />
          ) : (
            <div className="modal-card">
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
                  onClick={() => setIsModalActive(false)}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {!todo?.completed ? (
                    <strong className="has-text-danger">Planned</strong>
                  ) : (
                    <strong className="has-text-success">Done</strong>
                  )}
                  {' by '}
                  {todoOwner && (
                    <a href={`mailto:${todoOwner.email}`}>{todoOwner.name}</a>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
