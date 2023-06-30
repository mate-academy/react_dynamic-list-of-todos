import {
  useState,
  FC,
  useEffect,
  useContext,
} from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
// import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodoContext } from '../TodoContext/TodoProvider';

// type Props = {
//   selectedTodo:Todo;
//   setSelectedTodo:(value:Todo | null) => void;
// };

export const TodoModal: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(user => setSelectedUser(user))
        .catch()
        .finally(() => setIsLoading(false));
    }
  }, []);

  const closeModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setIsLoading(true);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              onClick={closeModal}
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
