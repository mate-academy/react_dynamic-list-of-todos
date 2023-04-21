import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedUser: User | null;
  todoInfo: Todo | null;
  onClick: () => void;
};

export const TodoModal: React.FC<Props> = (
  {
    selectedUser,
    todoInfo,
    onClick,
  },
) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser
        ? (
          <Loader />
        ) : (todoInfo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todoInfo.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="modal-close"
                onClick={onClick}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todoInfo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {
                  todoInfo.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>
                }

                {' by '}

                <a href={`mailto:${selectedUser.email}`}>
                  {selectedUser.name}
                </a>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
