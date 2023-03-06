import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  selectedTodo: Todo | undefined,
  selectedTodoId: number,
  setSelectedTodoId: (selectedTodoId: number | 0) => void,
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const fetchUser = async () => {
    try {
      const userFromServer = await getUser(selectedTodoId);

      setUser(userFromServer);
    } catch (error) {
      alert(`there is an error ${error}`);
    } finally {
      setIsUserLoaded(true);
    }
  };

  fetchUser();

  useEffect(() => {
    if (selectedTodo === null) {
      setSelectedTodoId(0);
    }
  }, []);

  return (
    <div
      className={classNames(
        'modal',
        { 'is-active': selectedTodoId !== null },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodoId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}
              {isUserLoaded && (
                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
