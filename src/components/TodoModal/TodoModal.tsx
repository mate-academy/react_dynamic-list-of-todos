import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo | null;
  changeShowModal: (value: boolean) => void;
  onSelectedTodo: (value: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  changeShowModal,
  onSelectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then((data: User) => {
          setUser(data);
        })
        .catch((error) => setUserError(error.message))
        .finally(() => setLoading(false));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setLoading(true);
                changeShowModal(false);
                onSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-success': selectedTodo?.completed,
                'has-text-danger': !selectedTodo?.completed,
              })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}

              </strong>
              {' by '}
              {userError ? (
                <p>
                  {userError}
                </p>
              ) : (
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
