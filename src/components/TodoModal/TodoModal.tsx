import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null,
  setSelectedTodo: () => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [todoModalVisible, setTodoModalVisible] = useState(true);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(user => setSelectedUser(user));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      { todoModalVisible && <div className="modal-background" />}

      {!selectedUser ? (
        <Loader />
      ) : (
        todoModalVisible && (
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
                  setTodoModalVisible(false);
                  setSelectedTodo();
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${selectedUser.email}`}>
                  {selectedUser.name}
                </a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
