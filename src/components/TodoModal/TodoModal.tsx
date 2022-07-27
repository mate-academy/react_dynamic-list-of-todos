import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUsers } from '../../api';

type Props = {
  todo: Todo,
  selectUsers: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, selectUsers }) => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        setUsers([...usersFromServer]);
      });
  }, []);

  const currentUser = users?.find(user => user.id === todo.userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
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
                selectUsers(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>
              {' by '}

              <a href="mailto:Sincere@april.biz">
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
