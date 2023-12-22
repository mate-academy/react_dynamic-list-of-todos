import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodoItem: Todo;
  setSelectedTodoItem: (selectedTodo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoItem,
  setSelectedTodoItem,
}) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    setModalLoading(true);

    getUser(selectedTodoItem.userId)
      .then(setSelectedUser)
      .finally(() => {
        setModalLoading(false);
      });
  }, [selectedTodoItem.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading && (
        <Loader />
      )}

      {!modalLoading && selectedUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoItem.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodoItem(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodoItem.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodoItem.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

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
