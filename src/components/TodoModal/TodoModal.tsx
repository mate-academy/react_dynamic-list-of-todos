import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../Todocontext/TodoContext';
import classNames from 'classnames';

type Props = {
  user: User;
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ user, todo }) => {
  const { name, email } = user;
  const { title, completed } = todo;
  const [userLoader, setUserLoader] = useState(true);
  const { setShowUserDetails } = useContext(TodoContext);

  const closeModal = () => {
    setShowUserDetails(false);
  };

  useEffect(() => {
    setTimeout(() => setUserLoader(false), 1000);
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userLoader ? (
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
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
