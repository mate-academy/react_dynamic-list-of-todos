import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todoSelected: Todo;
  setTodoSelected: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  todoSelected,
  setTodoSelected,
}) => {
  const [userFromServer, setUserFromServer] = useState<User | null>(null);

  useEffect(() => {
    getUser(todoSelected.userId)
      .then(setUserFromServer);
  }, [todoSelected.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userFromServer ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setTodoSelected(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoSelected.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todoSelected.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${userFromServer.email}`}>
                {userFromServer.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
