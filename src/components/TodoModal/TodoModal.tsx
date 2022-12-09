import React, {
  ReactEventHandler, useCallback, useEffect, useState,
} from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  checkedTodo: Todo
  onClose: ReactEventHandler
};

export const TodoModal: React.FC<Props> = ({ checkedTodo, onClose }) => {
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async (id: number) => {
    const data = await getUser(id);

    setUser(data);
    setIsLoadedUser(true);
  }, []);

  useEffect(() => {
    fetchUser(checkedTodo.userId);
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
              {`Todo #${checkedTodo.id}`}
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
              {checkedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {checkedTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

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
