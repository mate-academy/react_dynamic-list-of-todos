/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todoId: number;
  todos: Todo[];
  selectedTodo: (value: number) => number | void;
};

export const TodoModal: React.FC<Props> = ({
  todoId,
  todos,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isValidCard, setIsValidCard] = useState(true);

  const currentTodo = todos.find(({ id }) => id === todoId);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(userFromServer => setUser(userFromServer));
    }
  }, []);

  if (!isValidCard) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todoId}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setIsValidCard(false);
                  selectedTodo(0);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo?.completed
                  ? (
                    <strong className="has-text-success">
                      Done
                    </strong>
                  ) : (
                    <strong className="has-text-danger">
                      Planned
                    </strong>
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
