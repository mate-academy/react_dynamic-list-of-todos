import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  user: User | null;
  onCloseUser: (data: null) => void;
  onCloseTodo: (data: null) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  onCloseUser,
  onCloseTodo,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && <Loader />}
      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => {
                onCloseUser(null);
                onCloseTodo(null);
              }}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
