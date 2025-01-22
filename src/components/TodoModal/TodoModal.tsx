import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todoId: number;
  todos: Todo[];
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todoId, todos, onClose }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
      setUser(undefined);

      getUser(todo?.userId)
        .then(us => setUser(us))
        .finally(() => setLoader(false));
    }
  }, [todos, todoId]);

  const preperedTodos = todos.find(todo => todo.id === todoId);

  return (
    <div
      className={classNames('modal', {
        'is-active': true,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{preperedTodos?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {preperedTodos?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': preperedTodos?.completed,
                  'has-text-danger': !preperedTodos?.completed,
                })}
              >
                {!preperedTodos?.completed ? 'Planned' : 'Done'}
              </strong>

              {' by '}

              <a href={'mailto:' + user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
