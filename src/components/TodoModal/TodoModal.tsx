import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo | null,
  isTodoSelected: boolean,
  setIsTodoSelected: (newValue: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  isTodoSelected,
  setIsTodoSelected,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const getUserFromServer = async () => {
    if (selectedTodo?.userId === undefined) {
      return;
    }

    try {
      setUser(await getUser(selectedTodo?.userId));
    } catch (error) {
      throw new Error('User loading error');
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(!user && isTodoSelected) && <Loader />}

      {(user && isTodoSelected) && (
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
              onClick={() => {
                setUser(null);
                setIsTodoSelected(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

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
