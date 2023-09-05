import React from 'react';
import { Loader } from '../Loader';
import { TodoWithUser, useTodos } from '../Context';

interface TodoModalProps {
  todo: TodoWithUser;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo }) => {
  const { loadingModal, setModal, setLoadingModal } = useTodos();

  const {
    id, user, title, completed,
  } = todo;
  const { name, email } = user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="delete"
              onClick={() => {
                setModal(false);
                setLoadingModal(true);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)
              }

              {' by '}

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
