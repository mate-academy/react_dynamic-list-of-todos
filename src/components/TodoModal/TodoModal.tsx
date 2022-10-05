import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodoId: number,
  selectedUserId: number | null,
  onReset: () => void,
  todos: Todo[],
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoId,
  selectedUserId,
  onReset,
  todos,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userFromServer = async () => {
      const receivedUser = await getUser(selectedUserId);

      setUser(receivedUser);
    };

    userFromServer();
  }, []);

  const findedTodo = todos.find(({ id }) => selectedTodoId === id);

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
              {`Todo #${findedTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onReset}
              aria-label="button"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {findedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {findedTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

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
