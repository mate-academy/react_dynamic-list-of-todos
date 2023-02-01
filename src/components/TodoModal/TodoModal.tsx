import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  onCheck: (isSelected: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({ todo, onCheck }) => {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 500);

  useEffect(() => {
    getUser(todo.userId).then(setUser);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader && !user?.id
        ? <Loader />
        : (
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
                onClick={() => onCheck(false)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={cn('has-text-success', {
                  'has-text-danger': !todo.completed,
                })}
                >
                  {todo.completed ? 'Done' : 'Planned'}

                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
