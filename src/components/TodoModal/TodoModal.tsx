import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  user: User;
  closeModal: () => void;
  modalLoader: boolean,
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  closeModal,
  modalLoader,
}) => {
  const { id, title, completed } = todo;
  const { name, email } = user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        {modalLoader
          ? <Loader />
          : (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={closeModal}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}

                  {' by '}

                  <a href={`mailto:${email}`}>
                    {name}
                  </a>
                </p>
              </div>
            </>
          )}
      </div>
    </div>
  );
};
