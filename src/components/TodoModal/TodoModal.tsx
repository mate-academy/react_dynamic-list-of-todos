import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo,
  setSelectedTodo: () => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const loadedUsers = await getUser(selectedTodo.userId);

        setSelectedUser(loadedUsers);
      } catch (error) {
        setSelectedUser(null);
      } finally {
        setIsSelected(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isSelected ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={setSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed
                ? (
                  <strong className="has-text-danger">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

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
