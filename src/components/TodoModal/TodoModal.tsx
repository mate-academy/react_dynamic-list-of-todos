import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  isLoadingUser: boolean;
  selectedUser: User | null;
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  isLoadingUser,
  selectedUser,
  selectedTodo,
  setSelectedTodo,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (
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
              onClick={() => {
                setSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo && selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo ? (
                <strong
                  className={
                    selectedTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {selectedTodo.completed ? 'Done' : 'Planned'}
                </strong>
              ) : null}
              {' by '}
              {selectedUser ? (
                <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
              ) : null}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
