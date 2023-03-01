import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: number,
  unselectTodo: () => void,
  todos: Todo[],
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  unselectTodo,
  todos,
}) => {
  const [user, setUser] = useState<User>();
  const foundTodo = todos.find(todo => todo.id === selectedTodo);

  if (foundTodo) {
    const {
      id,
      title,
      completed,
      userId,
    } = foundTodo;

    const color = completed ? 'success' : 'danger';

    useEffect(() => {
      try {
        getUser(userId)
          .then(userFromServer => {
            setUser(userFromServer);
          });
      } catch (error) {
        throw new Error(`User: ${userId} -  not found`);
      }
    }, [selectedTodo]);

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
  }

  throw new Error('Todo not found');
};
