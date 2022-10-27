import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  userId: number;
  setUserId: (id: number) => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({
  userId,
  setUserId,
  selectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUserFromApi = async (id: number) => {
    const user = await getUser(id).then(userApi => userApi);

    if (user !== undefined) {
      setSelectedUser(() => {
        return user;
      });
    }
  };

  useEffect(() => {
    getUserFromApi(userId);
  }, []);

  const { title, completed, id } = selectedTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {selectedUser === null ? (
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
              onClick={() => {
                setUserId(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {(completed && (
                <strong className="has-text-success">Done</strong>))
              || (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
