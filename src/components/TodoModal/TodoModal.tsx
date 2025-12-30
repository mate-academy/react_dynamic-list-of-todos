import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getTodos, getUser } from '../../api';
import classNames from 'classnames';

type Props = {
  todoId: number;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todoId, onClose }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getTodos()
      .then(todos => {
        const foundTodo = todos.find(t => t.id === todoId);

        if (!foundTodo) {
          throw new Error('Todo not found');
        }

        setTodo(foundTodo);

        return getUser(foundTodo.userId);
      })
      .then(setUser)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [todoId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className="modal-card">
          <div className="modal-card-body has-text-danger">
            Unable to load todo
          </div>
        </div>
      )}

      {!isLoading && todo && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            {/* Title */}
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {/* Status + User */}
            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
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
