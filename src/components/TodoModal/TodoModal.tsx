import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

interface Props {
  handleCloseModal: () => void;
  selectedButtonId: number;
  todos: Todo[];
}
export const TodoModal: FC<Props> = ({
  handleCloseModal,
  selectedButtonId,
  todos,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const {
    userId,
    id,
    title,
    completed,
  } = selectedButtonId > todos.length
    ? todos[todos.length - 1]
    : todos[selectedButtonId - 1];

  const loadUser = async () => {
    const loadedUsers = await getUser(userId);

    setUser(loadedUsers);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        user
          ? (
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
                  onClick={handleCloseModal}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong className={cn(
                    { 'has-text-success': completed },
                    { 'has-text-danger': !completed },
                  )}
                  >
                    {
                      completed
                        ? 'Done'
                        : 'Planned'
                    }
                  </strong>
                  {' by '}

                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </div>
            </div>
          )
          : <Loader />
      }
    </div>
  );
};
