import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUserDetail } from '../../service/user';
import { getTodos } from '../../service/todo';

type Props = {
  detailsId: number,
  loading: () => void,
  close: () => void,
};

export const TodoModal: React.FC<Props> = (
  {
    detailsId,
    loading,
    close,
  },
) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedtodo, setSelectedTodo] = useState<Todo | undefined>();

  function getUserById() {
    return getTodos()
      .then(todos => todos.find(todo => todo.id === detailsId))
      .then(setSelectedTodo);
  }

  useEffect(() => {
    getUserById();
    getUserDetail()
      .then(users => users.find(user => user.id === selectedtodo?.userId))
      .then(setSelectedUser)
      .finally(() => setTimeout(() => {
        loading();
      }, 1000));
  }, [selectedUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {false ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedtodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={close}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedtodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {
                selectedtodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:{${selectedUser?.email}}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
