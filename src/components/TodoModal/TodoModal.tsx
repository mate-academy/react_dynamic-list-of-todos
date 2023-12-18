import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUserDetail } from '../../service/user';

type Props = {
  selectedTodo: Todo,
  close: () => void,
};

export const TodoModal: React.FC<Props> = (
  {
    selectedTodo,
    close,
  },
) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  useEffect(() => {
    getUserDetail()
      .then(users => users.find(user => user.id === selectedTodo?.userId))
      .then(setSelectedUser)
      .finally(() => setTimeout(() => {
        setIsLoadingDetails(false);
      }, 1000));
  }, [selectedUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingDetails ? (
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
              onClick={close}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {
                selectedTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:{${selectedUser?.email}}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
