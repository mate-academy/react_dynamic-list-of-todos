import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo,
  clearSelectedTodo: () => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  clearSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getSelectedUser = async () => {
    const userFromServer = await getUser(selectedTodo.userId);

    setSelectedUser(userFromServer);
  };

  useEffect(() => {
    getSelectedUser();
  }, []);

  const closeTodoModal = () => {
    setSelectedUser(null);
    clearSelectedTodo();
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { !selectedTodo || !selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              { selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
