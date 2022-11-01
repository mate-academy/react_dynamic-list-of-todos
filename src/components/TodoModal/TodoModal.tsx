import React, { useEffect, useState } from 'react';

import { getUser } from '../../api';

import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  isSelectedTodo: Todo,
  setIsSelectedTodoId: (todoId: number) => void;
  isLoadedUser: boolean;
  setIsLoadedUser: (status: boolean) => void;
}

export const TodoModal: React.FC<Props> = ({
  isSelectedTodo,
  setIsSelectedTodoId,
  isLoadedUser,
  setIsLoadedUser,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    id,
    title,
    completed,
    userId,
  } = isSelectedTodo;

  useEffect(() => {
    const getUserFromServer = async () => {
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
        setIsLoadedUser(true);
      } catch (error) {
        throw new Error('Failed on loading user from server');
      }
    };

    getUserFromServer();
  }, []);

  const onCloseTodo = () => {
    setIsSelectedTodoId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadedUser
        ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onCloseTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )
        : <Loader />}
    </div>
  );
};
