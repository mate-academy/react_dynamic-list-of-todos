import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  user: User | undefined;
  isLoading: boolean;
  onShow: (
    userNumber: number,
    comment: string,
    completedTrue: boolean | null,
    todo: Todo | null,
  ) => void;
  todoComment: string;
  completed: boolean | null;
  todo: Todo | null;
}

export const TodoModal: React.FC<Props> = ({
  user,
  isLoading,
  onShow,
  todoComment,
  completed,
  todo,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading || !user || !todo ? (
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onShow(0, '', null, null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoComment}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text-${!completed ? 'danger' : 'success'}`}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={user.email}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
