import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, closeModal }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [todo.userId]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {loading ? (
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
                {todo.title}
              </p>
              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                {todo.completed ? (
                  <strong className="has-text-danger">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
