import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

type Props = {
  userId: number;
  selectedTodoId: number;
  onSetUserId: (value: number) => void;
  onSelectedTodoId: (value: number) => void;
  todos: Todo[];
};

export const TodoModal: React.FC<Props> = ({
  userId,
  todos,
  selectedTodoId,
  onSetUserId,
  onSelectedTodoId,
}) => {
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const getUserFromServer = async () => {
      const userFromServer = await getUser(userId);

      setLoadingUser(true);
      setUser(userFromServer);
    };

    getUserFromServer();
  }, []);

  const findClickedTodoBySelectedId = useCallback((todoId: number) => {
    const findedTodo = todos.find(todo => todo.id === todoId);

    return findedTodo;
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!loadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onSetUserId(0);
                onSelectedTodoId(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {findClickedTodoBySelectedId(selectedTodoId)?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {findClickedTodoBySelectedId(selectedTodoId)?.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {!findClickedTodoBySelectedId(selectedTodoId)?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
