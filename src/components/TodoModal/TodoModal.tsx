import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { TodoModalProps } from '../../types/TodoList';

export const TodoModal: React.FC<TodoModalProps> = ({
  todos,
  loading,
  unSelectTodo,
}) => {
  const [loadedUsers, setLoadedUsers] = useState<User>();

  useEffect(() => {
    if (todos) {
      getUser(todos.userId).then(user => {
        setLoadedUsers(user);
      });
    }
  }, [todos]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!loadedUsers ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todos?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                loading(false);
                unSelectTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todos?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todos?.completed === false ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{loadedUsers?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
