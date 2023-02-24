import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { ErrorModal } from '../ErrorModal';

interface Props {
  todo: Todo | null
  clearSelectedTodo: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  clearSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const loadUser = useCallback(async () => {
    try {
      if (todo) {
        const userFromServer = await getUser(todo.userId);

        setUser(userFromServer);
      }
    } catch (error) {
      setIsLoadingError(true);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoadingError) {
    return (
      <ErrorModal
        todo={todo}
        clearSelectedTodo={clearSelectedTodo}
      />
    );
  }

  return (
    <div
      className={classNames(
        'modal',
        {
          'is-active': todo,
        },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />

      {user && todo
        ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              <button
                type="button"
                aria-label="Close modal"
                className="delete"
                data-cy="modal-close"
                onClick={clearSelectedTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed
                  && <strong className="has-text-success">Done</strong>}

                {!todo.completed
                  && <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )
        : <Loader />}
    </div>
  );
};
