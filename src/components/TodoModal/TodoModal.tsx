import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  isSelectedTodo: Todo,
  closeTodo: () => void,
};

export const TodoModal: React.FC<Props> = ({ isSelectedTodo, closeTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasErorr, setHasErorr] = useState(false);

  useEffect(() => {
    getUser(isSelectedTodo.userId)
      .then(data => {
        setUser(data);
      })
      .catch(() => {
        setHasErorr(true);
      });
  }, []);

  if (hasErorr) {
    return (
      <span>Sorry, try later</span>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user
        ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {isSelectedTodo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={closeTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {isSelectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {isSelectedTodo.completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
    </div>
  );
};
