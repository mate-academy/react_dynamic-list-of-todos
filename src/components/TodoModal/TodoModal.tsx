import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useFetchState } from '../../utils/useFetchState';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const { id, title, completed, userId } = todo;

  const [user, , fetchStatus] = useFetchState(
    null as User | null,
    getUser,
    userId,
  );

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {fetchStatus.loading ? (
        <Loader />
      ) : (
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
              onClick={onClose}
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
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : fetchStatus.errorText ? (
                <span className="has-background-danger">
                  error: {fetchStatus.errorText}
                </span>
              ) : (
                <strong className="has-text-danger">unknown</strong>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
