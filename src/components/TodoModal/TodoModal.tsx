import React, { useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Modal = {
  todos: Todo[],
  selectedUserId: number,
  selectedTodoId: number,
  onModalClose(): void,
};

export const TodoModal: React.FC<Modal> = ({
  selectedUserId,
  selectedTodoId,
  onModalClose,
  todos,
}) => {
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    return getUser(selectedUserId)
      .then(response => setUserInfo(response));
  });

  const [userTodo, setUserTodo] = useState<Todo | null>(() => {
    return todos.find(todo => todo.id === selectedTodoId) || null;
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userInfo?.name ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #2
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onModalClose();
                setUserTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {userTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {userTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`${userInfo.email}`}>
                {userInfo.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
