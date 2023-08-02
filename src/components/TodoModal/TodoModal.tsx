import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { useDataAfterDelay } from '../../utils/loading';

interface Props {
  todo: Todo;
  pickTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoModal: React.FC<Props> = ({ todo, pickTodo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const {
    data: user,
    loading: userLoading,
  } = useDataAfterDelay(() => getUser(userId));

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => pickTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
