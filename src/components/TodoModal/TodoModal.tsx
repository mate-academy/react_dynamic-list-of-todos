import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[];
  selectedUserId: number,
  selectUser: (value: number) => number | void,
};

export const TodoModal: React.FC<Props> = ({
  selectedUserId,
  selectUser,
  todos,
}) => {
  const curentTodo = todos.find(todo => todo.id === selectedUserId);
  const [user, setUsers] = useState<User | null>(null);
  const [cardOpen, setCardClose] = useState(true);

  useEffect(() => {
    if (curentTodo) {
      getUser(curentTodo.userId)
        .then(response => {
          setUsers(response);
        });
    }
  }, []);

  if (cardOpen === false) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${curentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                selectUser(0);
                setCardClose(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {curentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>

              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
