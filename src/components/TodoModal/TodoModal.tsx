import React, { Dispatch, SetStateAction } from 'react';
import { Loader } from '../Loader';
import { useTodoContext } from '../../context/myContext';

interface TodoModalProps {
  setIsTodo: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<TodoModalProps> = (
  { setIsTodo },
) => {
  const {
    activeUser, isUserLoading, activeTodo, setActiveTodo, setActiveUser,
  } = useTodoContext();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${activeTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setIsTodo(false);
                setActiveTodo(null);
                setActiveUser(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${activeUser?.email}`}>
                {activeUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const TodoModal = React.memo(Modal);
