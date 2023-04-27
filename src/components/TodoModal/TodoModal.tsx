import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[];
  handleSelectedTodo: (todoId: number) => void
  selectedTodoId: number;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectedTodoId,
  handleSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const selectedTodo = todos[selectedTodoId - 1];

  const getSelectedUser = async () => {
    const result = await getUser(selectedTodo.userId);

    setSelectedUser(result);
  };

  useEffect(() => {
    getSelectedUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleSelectedTodo(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
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
