import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setSelectedTodo: (value: Todo | null) => void
};

export const TodoModal: React.FC<Props> = ({ todo, setSelectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const onReset = () => {
    setUser(null);
    setSelectedTodo(null);
  };

  useEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .then(() => setLoading(false));
  }, []);

  return (
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
              Todo #
              { todo.id }
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={onReset}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
