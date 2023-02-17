import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  getSelectedTodoId: (todoId: number) => void
};

export const TodoModal: React.FC<Props> = ({ todo, getSelectedTodoId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    };

    getUsers();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {/* {console.log(user)} */}

      {!user ? (
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
                getSelectedTodoId(0);
              }}
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
              )
                : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
