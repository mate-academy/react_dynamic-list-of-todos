import React, { useEffect, useState } from 'react';
import { getTodo, getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodoId: number;
  removeTodo: () => void;
}

export const TodoModal: React.FC<Props> = ({ selectedTodoId, removeTodo }) => {
  const [todo, setTodo] = useState<Todo | undefined>();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getTodo(selectedTodoId).then((result) => setTodo(result));
  }, [selectedTodoId]);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId).then((result) => setUser(result));
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todo || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className=>Done</strong> */}
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
