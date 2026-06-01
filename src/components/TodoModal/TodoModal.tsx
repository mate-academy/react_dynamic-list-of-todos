import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';
import { getUser } from '../../api';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedTodo: (todo: Todo | null) => void;
  todo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  setSelectedTodo,
  todo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (todo?.userId) {
      getUser(todo.userId).then(user => {
        setSelectedUser(user);
        setIsLoading(false);
      });
    }
  }, [todo]);

  function handleModalClose() {
    setIsModalOpen(false);
    setSelectedTodo(null);
  }

  return (
    <div
      className={classNames('modal', { 'is-active': isModalOpen })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
