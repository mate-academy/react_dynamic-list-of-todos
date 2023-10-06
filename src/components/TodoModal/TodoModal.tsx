import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo,
  onCloseTab: () => void,
};

export const TodoModal: React.FC<Props> = ({
  todo, onCloseTab,
}) => {
  const [onLoadedUser, setOnLoaderUser] = useState<User | null>(null);

  const loadedUser = async () => {
    setOnLoaderUser(await getUser(todo.id));
  };

  useEffect(() => {
    loadedUser();
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!onLoadedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo ${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onCloseTab();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.completed
                  ? 'Done'
                  : 'Planned'}

              </strong>

              {' by '}

              <a href={`mailto:${onLoadedUser.email}`}>
                {onLoadedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
