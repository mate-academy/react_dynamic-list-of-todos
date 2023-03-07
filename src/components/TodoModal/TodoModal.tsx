import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  selectedTodo: number;
  unselectTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectedTodo,
  unselectTodo,
}) => {
  const [user, setUser] = useState<User>();
  const foundTodo = todos.find(todo => todo.id === selectedTodo);

  useEffect(() => {
    try {
      if (foundTodo?.userId) {
        getUser(foundTodo.userId)
          .then(setUser);
      }
    } catch (error) {
      throw new Error(`User: ${foundTodo?.userId} not found. Error: ${error}`);
    }
  }, [selectedTodo]);

  if (!foundTodo) {
    return (
      <p>No todo found</p>
    );
  }

  const {
    id,
    completed,
    title,
  } = foundTodo;

  const color = completed ? 'success' : 'danger';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={unselectTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={`has-text-${color}`}>
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
};
