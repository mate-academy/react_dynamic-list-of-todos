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
  todo: Todo | null;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>,
};

export const TodoModal: React.FC<Props> = ({
  todo, setSelectedTodo,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo && todo.userId !== undefined) {
      getUser(todo.userId)
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        }).catch(() => {
          throw new Error('error modal');
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close-button"
              onClick={() => setSelectedTodo(null)}
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
