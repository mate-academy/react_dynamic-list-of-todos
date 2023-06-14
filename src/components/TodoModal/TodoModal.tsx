import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  onOpen: (val: boolean) => void,
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ onOpen, todo }) => {
  const [user, setUser] = useState<User>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setUser(await getUser(todo.userId));
      setIsLoaded(!isLoaded);
    };

    fetchTodos();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded ? (
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
              onClick={() => onOpen(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames(
                { 'has-text-danger': !todo.completed },
                { 'has-text-success': todo.completed },
              )}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user && user.email}`}>
                {user && (user.name)}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
