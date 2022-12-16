import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  showingTodo: Todo,
  onShowingTodo: (showingTodo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = React.memo(({
  showingTodo,
  onShowingTodo,
}) => {
  const [curentUserId, setCurrentUserId] = useState<User | null>(null);

  useEffect(() => {
    getUser(showingTodo.userId).then(setCurrentUserId);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!curentUserId ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${showingTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onShowingTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {showingTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {showingTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href={`mailto:${curentUserId.email}`}>
                {curentUserId.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
