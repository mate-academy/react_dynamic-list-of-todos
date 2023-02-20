import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  changeModalState: () => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = (
  {
    changeModalState,
    selectedTodo,
  },
) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleClick = () => {
    changeModalState();
  };

  const getSelectedUser = async () => {
    const user = await getUser(selectedTodo.userId);

    setSelectedUser(user);
    setIsLoaded(true);
  };

  useEffect(() => {
    getSelectedUser();
  }, []);

  const {
    id,
    title,
    completed,
  } = selectedTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!isLoaded ? (
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
              onClick={handleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>
            {selectedUser
          && (
            <p className="block" data-cy="modal-user">
              {
                completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          )}
          </div>
        </div>
      )}
    </div>
  );
};
