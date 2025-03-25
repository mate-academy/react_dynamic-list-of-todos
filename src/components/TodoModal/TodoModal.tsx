import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  selectedTodo: Todo;
  handleCloseModal: () => void;
  setErrorMessage: (message: string) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleCloseModal,
  setErrorMessage,
}: Props) => {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsModalLoading(true);
    getUser(selectedTodo.userId)
      .then(userForModal => {
        setUser(userForModal);
      })
      .catch(() => setErrorMessage('Unexpected error, please try again later'))
      .finally(() => setIsModalLoading(false));
  }, [selectedTodo.userId, setErrorMessage]);

  return (
    <div
      className={cn('modal', { 'is-active': selectedTodo !== null })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isModalLoading && <Loader />}
      {!isModalLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
