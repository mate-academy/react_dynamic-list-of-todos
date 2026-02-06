import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({ todo, setSelectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUser(todo.userId)
      .then(userData => {
        setUser(userData);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={() => setSelectedTodo(null)} />

      <div className="modal-card">
        {loading ? (
          <div className="box" data-cy="modal-loader">
            <Loader />
          </div>
        ) : (
          <>
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
                onClick={() => setSelectedTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

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

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
