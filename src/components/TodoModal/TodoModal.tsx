import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoUser: User | null;
  onTodoReset: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  selectedTodoUser,
  onTodoReset,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedTodoUser
        ? (
          <Loader />
        ) : (
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
                onClick={() => onTodoReset()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames(
                    { 'has-text-danger': !completed },
                    { 'has-text-success': completed },
                  )}
                >
                  {completed
                    ? 'Done'
                    : 'Planned'}
                </strong>

                {' by '}

                <a href={selectedTodoUser && selectedTodoUser.email}>
                  {selectedTodoUser
                    ? selectedTodoUser.name
                    : 'Unknown user'}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
