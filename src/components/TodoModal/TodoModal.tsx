import { useState, useEffect } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo,
  setSelectedTodo: (todoId: number) => void;
  isLoadedUser: boolean;
  setIsLoadedUser: (status: boolean) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
  isLoadedUser,
  setIsLoadedUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(userId);

        setUser(fetchedUser);
        setIsLoadedUser(true);
      } catch (error) {
        throw new Error('User not found!');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoadedUser ? (
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
              onClick={() => setSelectedTodo(0)}
            />
          </header>

          <div className="modal-card-body">
            <p
              className="block"
              data-cy="modal-title"
            >
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn(
                  { 'has-text-success': completed },
                  { 'has-text-danger': !completed },
                )}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

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
};
