import {
  useState,
  useEffect,
  memo,
  FC,
} from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo | null,
  onClose: () => void,
}

export const TodoModal: FC<Props> = memo(
  ({ selectedTodo, onClose }) => {
    const {
      id,
      title,
      completed,
      userId,
    } = selectedTodo as Todo;

    const [isUserLoading, setLoadingStatus] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      getUser(userId)
        .then(userFromServer => {
          setUser(userFromServer);
        })
        .catch(() => setErrorMessage('something went wrong, try later'))
        .finally(() => setLoadingStatus(false));
    }, []);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {
          isUserLoading && <Loader />
        }

        {
          !!user && (
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
                  {
                    completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }

                  {' by '}

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )
        }

        {
          errorMessage && (
            <div className="modal-card">

              <header className="modal-card-head">
                <h1
                  className="title"
                >
                  {errorMessage}
                </h1>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={onClose}
                />
              </header>

            </div>
          )
        }
      </div>
    );
  },
);
