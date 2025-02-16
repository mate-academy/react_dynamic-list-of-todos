import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, setTodo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState<User | null>(null);

  const closeModal = () => {
    setTodo(null);
    setAuthor(null);
  };

  useEffect(() => {
    setIsLoading(true);

    getUser(todo.userId)
      .then(setAuthor)
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
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
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

              {' by '}

              <a href={`mailto:${author?.email}`}>{author?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
