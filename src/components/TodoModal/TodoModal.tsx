import React,
{
  useEffect,
  useState,
} from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  onCloseButton: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({ todo, onCloseButton }) => {
  const {
    userId,
    title,
    id,
    completed,
  } = todo;

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const fetchedUser = await getUser(userId);

      setUser(fetchedUser);
    } catch {
      // eslint-disable-next-line
      console.log('Error occurred in Modal fetch')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCloseButton(null)}
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
                {user && user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
