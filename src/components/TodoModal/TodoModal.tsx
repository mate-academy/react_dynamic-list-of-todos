// import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onCloseClick: (id: number) => void;
};

const baseUser: User = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

export const TodoModal: React.FC<Props> = (props) => {
  const { todo, onCloseClick } = props;
  const [userToShow, setUserToShow] = useState<User>(baseUser);

  useEffect(
    () => {
      getUser(todo.userId)
        .then(setUserToShow);

      return () => {
        setUserToShow(baseUser);
      };
    },
    [],
  );

  return (
    <div
      className="modal is-active"
      // {classNames('modal', { 'is-active': userToShow.id !== 0 })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {!userToShow.id ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCloseClick(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )
                : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

              {' by '}

              <a href={`mailto:${userToShow.email}`}>
                {userToShow.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
