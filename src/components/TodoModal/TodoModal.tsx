import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (todo: null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo, setSelectedTodo,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  const [user, setUser] = useState<User>();
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    const getUserAsync = async () => {
      const receivedUser = await getUser(userId);

      setUser(receivedUser);
      setIsLoader(false);
    };

    getUserAsync();
  }, [id]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoader ? (
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames(
                  { 'has-text-danger': !completed },
                  { 'has-text-success': completed },
                )}
              >
                {
                  completed
                    ? 'Done'
                    : 'Planned'
                }
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
