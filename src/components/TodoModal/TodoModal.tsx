import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  showTodo: number | null;
  setShowTodo: (value: number | null) => void;
  userInfo: {
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  todo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  showTodo,
  setShowTodo,
  userInfo,
  isLoading,
  todo,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={() => setShowTodo(null)} />

      {isLoading ? (
        <Loader loader={true} />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{showTodo}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setShowTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo ? todo.title : 'Task not found'}
            </p>

            <p className="block" data-cy="modal-user">
              {userInfo ? (
                <>
                  <strong
                    className={classNames({
                      'has-text-success': todo?.completed,
                      'has-text-danger': !todo?.completed,
                    })}
                  >
                    {todo?.completed ? 'Done' : 'Planned'}
                  </strong>{' '}
                  {' by '}
                  <a href={`mailto:${userInfo.email}`}>{userInfo.name}</a>
                </>
              ) : (
                <strong className="has-text-danger">No user data found.</strong>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
