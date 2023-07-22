import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  isActive: boolean;
  setIsActive: (newStatus: boolean) => void;
  selectedTodo: Todo | null,
  setSelectedTodo: (todo: Todo | null) => void,
  setSelectedUser: (todo: User | null) => void,
  selectedUser: User | null,
}

export const TodoModal: React.FC<Props> = ({
  isActive,
  setIsActive,
  selectedTodo,
  setSelectedTodo,
  setSelectedUser,
  selectedUser,
}) => {
  const handleCloseModal = () => {
    setIsActive(false);
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <div
      className={classNames('modal', {
        'is-active': isActive,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {!selectedUser ? (
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
              onClick={() => handleCloseModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames({
                'has-text-danger': !selectedTodo?.completed,
                'has-text-success': selectedTodo?.completed,
              })}
              >
                {selectedTodo?.completed ? (
                  'Done'
                ) : (
                  'Planned'
                )}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
