import { FC, MouseEventHandler } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface IProps {
  // userTodo: Todo[];
  user: User | null;
  loading: boolean;
  isActive: boolean;
  activeTodo: Todo | null;
  setIsActive: () => void;
  setActiveButton: () => void;
}

export const TodoModal: FC<IProps> = ({
  user,
  loading,
  isActive,
  activeTodo,
  setIsActive,
  setActiveButton,
}) => {
  const closeModal = () => {
    setIsActive();
    setActiveButton();
  };

  const onWrapperClick: MouseEventHandler<HTMLDivElement> = event => {
    const clickedElement = event.currentTarget;

    if (clickedElement.classList.contains('modal-background')) {
      closeModal();
    }
  };

  return (
    <>
      {isActive && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" onClick={onWrapperClick} />

          <Loader loading={loading} />

          {!loading && user && activeTodo && (
            <div key={user.id} className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{activeTodo.id}
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
                  {activeTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      !activeTodo.completed
                        ? 'has-text-danger'
                        : 'has-text-success'
                    }
                  >
                    {!activeTodo.completed ? 'Planned' : 'Done'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
