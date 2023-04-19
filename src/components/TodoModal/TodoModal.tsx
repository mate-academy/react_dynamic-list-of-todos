import React, { useMemo } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  selectedUser: User | null,
  selectedTodoId: number | null,
  changeTodo(todoId: number | null): void,
  changeUser(todoId: number | null): void,
  loadUser(): void,
  resetUser(): void,
};

export const TodoModal: React.FC<Props> = (
  {
    todos,
    selectedUser,
    selectedTodoId,
    changeTodo,
    changeUser,
    loadUser,
    resetUser,
  },
) => {
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useMemo(() => {
    loadUser();
  }, [selectedUser]);

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
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                changeTodo(null);
                changeUser(null);
                resetUser();
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

              <a href="mailto:Sincere@april.biz">
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
