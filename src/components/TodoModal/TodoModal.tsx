import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  todo: Todo;
  clearTodo: () => void;
}

export const TodoModal: FC<TodoModalProps> = ({ todo, clearTodo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;
  const [currentUser, setCurrenUser] = useState<User | null>(null);

  const loadUserFromServer = useCallback(async (idOfUser) => {
    const user = await getUser(idOfUser);

    setCurrenUser(user);
  }, []);

  useEffect(() => {
    loadUserFromServer(userId);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
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
              onClick={() => clearTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
