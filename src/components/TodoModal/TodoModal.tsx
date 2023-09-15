import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { showLoader } from '../../services/services';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  onShowModal: (v: boolean) => void,
  user: User | null,
  selectedTodo: Todo | undefined,
  selectedTodoId: number,
  onSetSelectedTodoId: (v: number) => void,
};

export const TodoModal: React.FC<Props> = ({
  onShowModal,
  user,
  selectedTodo,
  selectedTodoId,
  onSetSelectedTodoId,
}) => {
  const [hasLoader, setHasLoader] = useState(true);

  const handleCloseModal = () => {
    onShowModal(false);
    onSetSelectedTodoId(0);
  };

  useEffect(() => {
    showLoader(setHasLoader);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {hasLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleCloseModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
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
