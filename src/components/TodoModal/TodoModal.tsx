import React, { useMemo, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  setHideTodoModal: (hide: boolean) => void;
  resetTodo: (hide: number) => void;
  currentTodo: number;
  todos: Todo[];
};

export const TodoModal: React.FC<Props> = ({
  setHideTodoModal,
  resetTodo,
  currentTodo,
  todos,
}) => {
  const [currentUser, setCurrentUsers] = useState<User>();

  useMemo(() => {
    if (currentTodo !== 0) {
      getUser(currentTodo).then((user) => setCurrentUsers(user));
    }
  }, [currentTodo]);

  const findTodo = todos.find(todo => todo.id === currentTodo);

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
              {`Todo #${currentTodo}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setHideTodoModal(false);
                resetTodo(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {findTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={`has-text-${findTodo?.completed ? 'succses' : 'danger'}`}
              >
                {findTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
