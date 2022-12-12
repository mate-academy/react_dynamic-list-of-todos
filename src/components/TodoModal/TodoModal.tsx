import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo,
  onCloseInfo: (todo: null) => void,
}

export const TodoModal: React.FC<Props> = ({
  todo,
  onCloseInfo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);

  const loadUser = async (userId: number) => {
    const loadedUser = await getUser(userId);

    if (loadedUser) {
      setUser(loadedUser);
    } else {
      setUser(null);
    }

    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);

    loadUser(todo.userId);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => onCloseInfo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed
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
};
