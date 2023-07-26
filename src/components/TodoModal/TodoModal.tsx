import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setSelectedTodo: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = React.memo(({
  todo,
  user,
  setUser,
  setSelectedTodo,
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
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(null);
                setUser(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {
                !todo?.completed && (
                  <strong className="has-text-danger">Planned</strong>
                )
              }

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
