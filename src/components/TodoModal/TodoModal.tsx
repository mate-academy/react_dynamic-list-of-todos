import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';

interface TodoModalProps {
  todo: Todo;
  clearModal: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  clearModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState<User>();

  useEffect(() => {
    getUser(todo.userId)
      .then((response) => setAuthor(response))
      .finally(() => setIsLoading(false));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
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
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={clearModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {author ? (
                <span>
                  {' by '}
                  <a href={`mailto:${author.email}`}>
                    {author.name}
                  </a>
                </span>
              ) : (
                'Author not found'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
