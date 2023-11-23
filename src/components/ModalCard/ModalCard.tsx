import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user: User,
  todo: Todo,
  onSelectUser: (id: number) => void,
  onSelectTodo: (todo: null) => void,
};

export const ModalCard: React.FC<Props> = ({
  user,
  todo,
  onSelectUser,
  onSelectTodo,
}) => {
  const {
    email,
    name,
  } = user;

  const {
    id,
    title,
    completed,
  } = todo;

  const reset = (userId: number, toDo: null) => {
    onSelectUser(userId);
    onSelectTodo(toDo);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          {`Todo #${id}`}
        </div>

        <button
          type="button"
          aria-label="null"
          className="delete"
          data-cy="modal-close"
          onClick={() => reset(0, null)}
        />
      </header>

      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">
          {title}
        </p>

        <p className="block" data-cy="modal-user">

          {completed ? (
            <strong className="has-text-success">Done</strong>
          ) : (
            <strong className="has-text-danger">Planned</strong>
          )}

          {' by '}

          <a href={`mailto:${email}`}>
            {name}
          </a>
        </p>
      </div>
    </div>
  );
};
