import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todoId: number;
  todos: Todo[];
  selectTodo: (value: number) => void;
};

export const TodoModal: React.FC<Props> = ({ todoId, todos, selectTodo }) => {
  const [users, setUsers] = useState<User | null>(null);

  const preaperedTodo = todos.find(todo => todo.id === todoId) || null;

  useEffect(() => {
    getUser(preaperedTodo?.userId || 0)
      .then((selectedUser) => {
        return setUsers(selectedUser);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!preaperedTodo || !users ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {preaperedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUsers(null);
                selectTodo(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {preaperedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {preaperedTodo.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                )
                : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}

              <a href={`mailto:${users.email}`}>
                {users.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
