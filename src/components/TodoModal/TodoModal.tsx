/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo | null,
  onClose: () => void,
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectedTodo, onClose } = props;
  const [isModalLoading, setIsModalloading] = useState(false);

  const [
    currentUser,
    setCurrentUser,
  ] = useState<User | null>(null);

  useEffect(() => {
    setIsModalloading(true);

    getUser(selectedTodo?.userId ?? 0)
      .then(setCurrentUser)
      .finally(() => setIsModalloading(false));
  }, [selectedTodo]);

  const todo = selectedTodo;
  const user = currentUser;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">

              {todo?.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                )

                : (
                  <strong className="has-text-danger">Planned</strong>
                )}
              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
