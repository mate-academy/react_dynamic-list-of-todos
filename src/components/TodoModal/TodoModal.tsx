import React from "react";
import { Todo } from "../../types/Todo";
import { User } from "../../types/User";
import { Loader } from "../Loader";

type Props = {
  loaderUser: boolean;
  selectedTodo: Todo | null;
  user: User | null;
  onModalClose: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  loaderUser,
  selectedTodo,
  user,
  onModalClose,
}) => {
  const handleBackdropClick = () => {
    onModalClose(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={handleBackdropClick}
        aria-label="Close modal"
      />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${selectedTodo?.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => onModalClose(null)}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {selectedTodo?.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {" by "}

            {loaderUser ? (
              <Loader />
            ) : (
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
