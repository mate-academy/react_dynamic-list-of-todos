import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null;
  user: User | null;
  isVisible: boolean;
  isFetching: boolean;
  setIsModalVisible: (isVisibe: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isVisible,
  isFetching,
  setIsModalVisible,
}) => {
  return (
    <div
      className={classNames('modal', {
        'is-active': isVisible,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isFetching ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setIsModalVisible(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto: ${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
