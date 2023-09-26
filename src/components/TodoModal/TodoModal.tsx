import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser, getTodos } from '../../api';

type Props = {
  selectUser: number
  selectTodo: number,
  selectItems: (UserId: number, todoId: number) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectUser,
  selectTodo,
  selectItems,
}) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [todo, setTodo] = useState<Todo | null | undefined>(null);

  useEffect(() => {
    getUser(selectUser).then(res => setUser(res));
    getTodos().then(res => setTodo(res.find(el => el.id === selectTodo)));
  }, [selectUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
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
              onClick={() => selectItems(0, 0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames({
                'has-text-danger': !todo?.completed,
                'has-text-success': todo?.completed,
              })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
