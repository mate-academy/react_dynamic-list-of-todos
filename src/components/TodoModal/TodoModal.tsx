import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useLoading } from '../../hooks/useLoading';
type Props = {
  selectedTodo: Todo | null;
  handleClickOfPost: () => void;
};
export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleClickOfPost,
}) => {
  const [users, setUsers] = useState<User | null>(null);
  const { isLoading, startLoading, finishLoading } = useLoading();

  useEffect(() => {
    startLoading();
    if (selectedTodo) {
      const fetchUser = async () => {
        try {
          const response = await getUser(selectedTodo?.userId);

          setUsers(response);
        } finally {
          finishLoading();
        }
      };

      fetchUser();
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

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
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleClickOfPost()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {/* <strong className="has-text-danger">Planned</strong> */}
              <strong
                className={cn('has-text', {
                  'has-text-success': selectedTodo.completed,
                  'has-text-danger': !selectedTodo.completed,
                })}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${users?.email}`}>{users?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
