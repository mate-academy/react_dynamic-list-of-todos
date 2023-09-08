import { TodoModalInfo } from '../../types/TodoModalInfo';
import { Loader } from '../Loader';

type TodoModalProps = {
  info: TodoModalInfo
  onModalClose: () => void
};

export const TodoModal = (
  {
    info: {
      todoId,
      todoTitle,
      todoCompleted,
      userEmail,
      userName,
      showModalLoader,
    },
    onModalClose,
  }: TodoModalProps,
) => {
  const todoStatusClass = `has-text-${todoCompleted ? 'success' : 'danger'}`;
  const todoStatusText = todoCompleted ? 'Done' : 'Planned';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {showModalLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoTitle}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={todoStatusClass}>{todoStatusText}</strong>

              {' by '}

              <a href={`mailto:${userEmail}`}>
                {userName}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
