import React, { useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todoId: number;
  todos: Todo[];
  selectTodo: (argument: number) => number | void;
};

export const TodoModal: React.FC<Props> = ({ todoId, todos, selectTodo }) => {
  const [cardOpen, setCardClose] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = todos.find(
    (todo: Todo) => todo.id === todoId,
  );

  const uploadUser = async () => {
    if (currentTodo) {
      const currentUser = await getUser(currentTodo.userId);

      setUser(currentUser);
    }
  };

  uploadUser();

  if (cardOpen === false) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoId ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todoId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setCardClose(false);
                selectTodo(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              {!user ? (
                <Loader />
              )
                : (
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
