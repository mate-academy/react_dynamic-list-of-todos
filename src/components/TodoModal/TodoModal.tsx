import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { TodoUsers } from '../TodoUser';

type Props = {
  todo: Todo;
  setUserId: (id: number) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, setUserId }) => {
  const [timer, setTimer] = useState(false);

  setTimeout(() => {
    setTimer(true);
  }, 300);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!timer ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setUserId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames(
                  'has-text-success',
                  { 'has-text-danger': !todo.completed },
                )}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <TodoUsers userId={todo.userId} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
