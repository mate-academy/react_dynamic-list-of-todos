import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useUser } from '../../hooks/useUser';

interface TodoModalProps {
  selectedTodo: Todo;
  onModalClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  onModalClose,
}) => {
  const userQuery = useUser(selectedTodo.userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userQuery.loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
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
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${userQuery.todos?.email}`}>
                {userQuery.todos?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
