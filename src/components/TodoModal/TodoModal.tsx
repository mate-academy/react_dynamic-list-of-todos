import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { TodoType } from '../../types/TodoType';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: TodoType,
  setSelectedTodo: (todo: TodoType | null) => void,
};

export const TodoModal: React.FC<Props> = ({ todo, setSelectedTodo }) => {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    id, title, completed, userId,
  } = todo;

  const handleCloseClick = () => {
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  useEffect(() => {
    setLoading(true);

    getUser(userId)
      .then(userFromServer => {
        setSelectedUser(userFromServer);
      })
      .finally(() => setLoading(false));
  }, [todo]);

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
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>)
                : (
                  <strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {selectedUser ? selectedUser.name : 'unknown'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
