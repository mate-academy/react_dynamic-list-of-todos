import { Loader } from '../Loader';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingUser: boolean;
  todosId: number;
  todos: Todo[];
  user?: User;
}

export const TodoModal: React.FC<Props> = ({
  setIsOpened,
  isLoadingUser,
  todosId,
  todos,
  user,
}) => {
  // const selectedTodo = todosId - 1; // because id starts from 1, index starts from 0
  const selectedTodo = todos.find(todo => todo.id === todosId);

  if (!selectedTodo) {
    return;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card" key={selectedTodo.id}>
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
              onClick={() => setIsOpened(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  selectedTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger',
                )}
              >
                {selectedTodo.completed ? `Done` : `Planned`}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
