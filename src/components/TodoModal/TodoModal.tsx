import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null,
  selectedTodo: React.Dispatch<React.SetStateAction<number>>
};

export const TodoModal: React.FC<Props> = ({
  todo,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [userIsLoaded, setUserIsLoaded] = useState(false);

  useEffect(() => {
    const loadUser = async (userId: number) => {
      const userFromServer = await getUser(userId);
  
      if (userFromServer) {
        setUser(userFromServer);
        setUserIsLoaded(true);
      }
    };

    if (todo) {
      loadUser(todo.userId)
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userIsLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectedTodo(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': todo?.completed,
                  'has-text-danger': !todo?.completed,
                })}
              >
                {todo?.completed
                  ? 'Done'
                  : 'Planned'}
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
