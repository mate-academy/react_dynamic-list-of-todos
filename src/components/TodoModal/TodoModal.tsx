import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  modalTodo: Todo
  сloseModal: () => void
};

export const TodoModal: React.FC<Props> = ({
  modalTodo,
  сloseModal,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (modalTodo) {
      getUser(modalTodo?.userId).then(carentUser => (setUser(carentUser)));
    }
  }, [modalTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!modalTodo || !user?.name
        ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${modalTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={сloseModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {modalTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {modalTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
