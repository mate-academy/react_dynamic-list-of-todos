import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { getUser } from '../../api';
import { useEffect, useState } from 'react';
import { User } from '../../types/User';

type Props = {
  activeTodo: Todo;
  setActiveTodo: (todo: null) => void;
};

export const TodoModal = ({ activeTodo, setActiveTodo }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeTodo) {
      getUser(activeTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [activeTodo]);

  const handleExit = () => {
    setActiveTodo(null);
    setUser(null);
  };

  return (
    <div
      className={cn({ modal: true, 'is-active': activeTodo })}
      data-cy="modal"
    >
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
              Todo #{activeTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleExit}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
