import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[];
  userId: number;
  stopShow: () => void;
};

export const TodoModal: React.FC<Props> = ({ todos, userId, stopShow }) => {
  const [todoFromId, setTodoFromId] = useState<Todo>();
  const [user, setUser] = useState<User>();

  const getUserFromServer = async () => {
    const loadedUser = await getUser(userId);

    setUser(loadedUser);
  };

  useEffect(() => {
    getUserFromServer();
    setTodoFromId(todos.find(todo => todo.userId === userId));
  }, []);

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
              Todo #
              {user.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                stopShow();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoFromId?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todoFromId?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
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
