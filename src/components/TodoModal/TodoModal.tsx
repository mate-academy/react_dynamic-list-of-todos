import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo | null;
  onSelectedToDo: (todo:Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  onSelectedToDo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo?.userId) {
      getUser(todo.userId)
        .then(response => {
          setUser(response);
        });
    }
  }, []);

  const clearModal = () => {
    onSelectedToDo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
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
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={clearModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed
                ? (
                  <>
                    <strong className="has-text-success">Done</strong>
                    {' by '}
                    <a href={`mailto:${user?.email}`}>
                      {user?.name}
                    </a>
                  </>
                ) : (
                  <>
                    <strong className="has-text-danger">Planned</strong>
                    {' by '}
                    <a href={`mailto:${user?.email}`}>
                      {user?.name}
                    </a>
                  </>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
