import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  user: User | null;
  isLoadingUser: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isLoadingUser,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            {`Todo #${todo.id}`}
          </p>

          <button
            type="button"
            className="delete"
            aria-label="close"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          <p data-cy="modal-title">{todo.title}</p>

          {isLoadingUser ? (
            <Loader />
          ) : (
            user && (
              <p data-cy="modal-user">
                {todo.completed
                  ? `Done by ${user.name}`
                  : `Planned by ${user.name}`}
              </p>
            )
          )}
        </section>
      </div>
    </div>
  );
};
