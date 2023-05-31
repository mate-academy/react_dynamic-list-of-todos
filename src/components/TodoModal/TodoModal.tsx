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
  // const [selectedUser, setSelectedUser] = useState<User>();
  // const [selectedTodo, setSelectedTodo] = useState<Todo>();

  // useEffect(() => {
  //   setSelectedTodo(todos.find(todo => todo.id === selectedId));
  //   getUser(selectedTodo.userId).then(setSelectedUser);
  //     // eslint-disable-next-line no-console
  //     console.log('user', selectedUser);
  // }, []);

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
                {`Todo #${selectedTodo?.id}`}
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
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={`has-text-${selectedTodo?.completed ? 'success' : 'danger'}`}>
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
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
