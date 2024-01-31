import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { TodosContext } from '../TodosContext/TodosContext';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  currentUserId: number | null,
  todos: Todo[] | null,
};

export const TodoModal: React.FC<Props> = ({
  currentUserId, todos,
}) => {
  const { handleShowModal, currentTodoId } = useContext(TodosContext);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (currentUserId) {
      getUser(currentUserId).then((user) => {
        setCurrentUser(user);
      });

      let currTodo;

      if (todos !== null) {
        currTodo = todos.find(todo => todo.id === currentTodoId);
      }

      if (currTodo !== undefined) {
        setCurrentTodo(currTodo);
      }
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleShowModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
