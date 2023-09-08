import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  clearTodo: () => void,
};

export const TodoModal: React.FC<Props> = ({ todo, clearTodo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  let email;
  let name;

  useEffect(() => {
    getUser(todo.userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
        setIsLoading(false);
      });
  }, [todo.id]);

  if (user) {
    ({ email, name } = user);
  }

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
              onClick={clearTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{todo.title}</p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user && (
                <a href={`mailto:${email}`}>{name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
