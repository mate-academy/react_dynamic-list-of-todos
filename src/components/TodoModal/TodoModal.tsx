/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  userId: number;
  todo: Todo,
  selectedTodo(state: Todo | null): void,
};

export const TodoModal: React.FC<Props> = ({
  userId, todo, selectedTodo,
}) => {
  const [users, setUsers] = useState<User>();

  useEffect(() => {
    getUser(userId).then(usersFromServer => {
      setUsers(usersFromServer);
    });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => {
          selectedTodo(null);
        }}

      />

      {!users ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                selectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
              {' by '}

              <a href={`mailto:${users.email}`}>
                {users?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
