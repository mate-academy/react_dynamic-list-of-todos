import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo
  toggleModal: (a: boolean) => void
  user: User
  isLoadingUser: boolean
};

export const TodoModal: React.FC<Props> = ({
  todo,
  toggleModal,
  user,
  isLoadingUser,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />
      {isLoadingUser && <Loader />}

      {!isLoadingUser
        && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => toggleModal(false)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>

              </p>
            </div>
          </div>
        )}
    </div>
  );
};
