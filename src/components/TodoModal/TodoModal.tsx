import React, { useState, useEffect, SetStateAction } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  selectTodo: (todoId: number) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, selectTodo }) => {
  const [isOpen, setisOpen] = useState(false);
  const [user, setUser] = useState<SetStateAction<User>>();

  const init = async () => {
    const userss = await getUser(todo.userId);

    setUser(userss);
  };

  useEffect(() => {
    init();
  }, []);

  return (isOpen && init) ? (
    <Loader />
  ) : (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(!user) ? (
        <Loader />
      ) : (

        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setisOpen(true);
                selectTodo(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? <strong className="has-text-success">Done </strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user?.name}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
