import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo | undefined,
  onClose: (id: number) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [author, setAuthor] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);

    if (todo) {
      getUser(todo.userId)
        .then(setAuthor)
        .finally(() => setIsUserLoading(false));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
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
              onClick={() => onClose(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {`${todo?.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${author?.email}`}>
                {author?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
