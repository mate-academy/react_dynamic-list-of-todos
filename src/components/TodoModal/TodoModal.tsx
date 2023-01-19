import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  activeTodo: Todo,
  userDetails: User,
  onClose: () => void,
};

export const TodoModal: React.FC<Props> = ({
  userDetails,
  activeTodo,
  onClose,
}) => {
  const { title, completed } = activeTodo;
  const { id, name, email } = userDetails;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {id === 0
        ? <Loader />
        : (
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
                onClick={onClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${email}`}>
                  {name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
