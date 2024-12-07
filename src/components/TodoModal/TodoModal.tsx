import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  currentTodo: Todo;
  setCurrentTodo: (result: null) => void;
}

export const TodoModal: React.FC<Props> = ({ currentTodo, setCurrentTodo }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const { userId, completed, id, title } = currentTodo;

  useEffect(() => {
    (async () => {
      try {
        const userFromApi = currentTodo && (await getUser(userId));

        setUser(userFromApi);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  const handleClose = () => {
    setCurrentTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
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
              Todo #{id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
