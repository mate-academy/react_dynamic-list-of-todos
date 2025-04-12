/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  choosenTodo: Todo;
  isLoadingUser: boolean;
  handlesetIsLoadingUser: (loadingStatus: boolean) => void;
  getUser: (userId: number) => Promise<User>;
  closeTodoModal: () => void;
};

export const TodoModal: React.FC<Props> = ({
  choosenTodo,
  isLoadingUser,
  handlesetIsLoadingUser,
  getUser,
  closeTodoModal,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        handlesetIsLoadingUser(true);
        const userOfTodo = await getUser(choosenTodo.userId);

        setUser(userOfTodo);
      } catch (error) {
        console.error(error);
      } finally {
        handlesetIsLoadingUser(false);
      }
    };

    loadData();
  }, [choosenTodo]);

  return (
    <div
      className={classNames('modal', {
        'is-active': choosenTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{choosenTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {choosenTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {choosenTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
