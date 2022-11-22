import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todoId: number,
  todos: Todo[],
  userId: number,
  handleOnChoose: (userId: number, todoId: number) => void,
};

export const TodoModal: React.FC<Props>
= ({
  todoId,
  todos,
  userId,
  handleOnChoose,
}) => {
  const selectedTodo = todos.find(todo => todo.id === todoId);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(user => setCurrentUser(user))
      .catch(error => {
        throw new Error(`User not found ${error}`);
      });
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { !currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleOnChoose(0, 0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  classNames({ 'has-text-danger': !selectedTodo?.completed },
                    { 'has-text-success': selectedTodo?.completed })
                }
              >
                {
                  selectedTodo?.completed
                    ? 'Done'
                    : 'Planned'
                }
              </strong>

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
