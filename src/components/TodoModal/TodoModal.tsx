import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  modalTodo: Todo,
  setModalTodo: (value: Todo | undefined) => void,
  setIsModalActive: (value: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({
  modalTodo,
  setIsModalActive,
  setModalTodo
  }) => {

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(modalTodo.userId).then(setUser)
      .finally(() => setIsLoading(false));
  }, [modalTodo]);

  const delitModal = () => {
    setModalTodo(undefined);
    setIsModalActive(false)
  }

  return (
    <div className="modal is-active" data-cy="modal">
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
              Todo #{modalTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={delitModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {modalTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
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
