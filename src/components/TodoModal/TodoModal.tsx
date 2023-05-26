import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type TodoModalProps = {
  todo: Todo;
  onCloseModal: () => void; // Add onCloseModal prop
  userLoading: boolean; // Add userLoading prop
};

export const TodoModal: React.FC<
TodoModalProps> = ({ todo, onCloseModal, userLoading }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <button
        type="button"
        className="delete"
        data-cy="modal-close"
        onClick={onCloseModal}
        aria-label="Close Modal"
        tabIndex={0}
      />

      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">

          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {todo.title}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.description}
              <strong className="has-text-danger">Planned</strong>
              {' by '}
              <a href={`mailto:${todo.email}`}>{todo.username}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
