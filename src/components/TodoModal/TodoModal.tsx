import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  handler: () => void;
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({
  handler,
  todo,
}) => {
  const {
    id: todoId,
    title,
    completed,
    userId,
  } = todo;
  const { data, isLoading } = useQuery(['user', userId], () => getUser(userId));

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handler}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                completed
                && <strong className="has-text-success">Done</strong>
              }
              {
                !completed
                && <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:${data?.email}`}>
                {data?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
