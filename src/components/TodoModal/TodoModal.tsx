import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  handleClosing: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  handleClosing,
}) => {
  const [todoUser, setTodoUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId).then(user => {
      setTodoUser(user);
    });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClosing}

            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn(
                { 'has-text-success': todo.completed },
                { 'has-text-danger': !todo.completed },
              )}
              >
                {!todo.completed ? 'Planned' : 'Done'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {todoUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
