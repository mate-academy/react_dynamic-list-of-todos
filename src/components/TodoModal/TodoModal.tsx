import React, { useState, useEffect, useCallback } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodoId: number;
  todos: Todo[];
  onDeletedSelectedTodo: (todo: null) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodoId,
  todos,
  onDeletedSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getTodoById = useCallback(
    (id: number) => todos.find((todo) => todo.id === id),
    [selectedTodoId],
  );

  useEffect(() => {
    getUser(selectedTodoId).then((user) => setSelectedUser(user));
  }, [selectedTodoId]);

  console.log(getTodoById(selectedTodoId));

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
              onClick={() => {
                onDeletedSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {getTodoById(selectedTodoId)?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {getTodoById(selectedTodoId)?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
