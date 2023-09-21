import React,
{
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  setHandleClose: Dispatch<SetStateAction<boolean>>,
  todo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ setHandleClose, todo }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo && todo.userId !== undefined) {
      getUser(todo.userId)
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setHandleClose(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            {user && (
              <div>
                <p className="block" data-cy="modal-user">
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                  {' '}
                  by
                  {' '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
