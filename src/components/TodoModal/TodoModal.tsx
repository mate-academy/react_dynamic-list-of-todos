import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  selectedUser: User | undefined,
  selectedTodo: Todo | undefined,
  reset: () => void;
  isSelectedLoading: boolean,
}

export const TodoModal = ({
  selectedUser, selectedTodo, reset, isSelectedLoading,
}:TodoModalProps) => {
  const { name, email } = selectedUser || {};
  const { id, title, completed } = selectedTodo || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isSelectedLoading
        ? <Loader />
        : (
          <div className="modal-card">
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
                onClick={() => reset()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={`has-text-${completed ? 'success' : 'danger'}`}>
                  {completed ? 'Done' : 'Planned'}
                </strong>

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
