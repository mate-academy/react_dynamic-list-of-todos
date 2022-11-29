import {
  FC,
  memo,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  selectedTodo: Todo;
  closeModalHandler: () => void;
}

export const TodoModal: FC<TodoModalProps> = memo(
  ({
    selectedTodo,
    closeModalHandler,
  }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLoaded, setUserLoaded] = useState(false);
    const {
      userId, id, title, completed,
    } = selectedTodo;

    useEffect(() => {
      const loadUserFromServer = async () => {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
        setUserLoaded(true);
      };

      loadUserFromServer();
    }, []);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!userLoaded
          ? <Loader />
          : (
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
                  onClick={closeModalHandler}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}

                  {' by '}

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
      </div>
    );
  },
);
