import { Loader } from '../Loader';
import { TodoDetails } from '../../App';

type TodoModalProps = {
  selectedTodo: TodoDetails | null;
  isLoading: boolean;
  onClose: () => void;
};

export const TodoModal = ({
  selectedTodo,
  isLoading,
  onClose,
}: TodoModalProps) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" />

    {isLoading || !selectedTodo ? (
      <Loader />
    ) : (
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${selectedTodo.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            <strong
              className={
                selectedTodo.isCompleted
                  ? 'has-text-success'
                  : 'has-text-danger'
              }
            >
              {selectedTodo.isCompleted ? 'Done' : 'Planned'}
            </strong>

            {' by '}

            <a href={`mailto:${selectedTodo.userEmail}`}>
              {selectedTodo.userName}
            </a>
          </p>
        </div>
      </div>
    )}
  </div>
);
