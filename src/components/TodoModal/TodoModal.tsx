import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  setTodo: (value: null) => void;
}

export const TodoModal: React.FC<Props> = ({ todo, setTodo }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { userId, id, completed } = todo;

  useEffect(() => {
    getUser(userId)
      .then(setSelectedUser);
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header id="modal-card-label" className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              aria-labelledby="modal-card-label"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedUser(null);
                setTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              { completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
