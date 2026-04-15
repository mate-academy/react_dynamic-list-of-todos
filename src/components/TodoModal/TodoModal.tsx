import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  selectedTodo: Todo;
  onCloseTodoModal: () => void;
};

const TodoModalComponent: React.FC<Props> = ({
  selectedTodo,
  onCloseTodoModal,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setUser(null);
    setError('');
    setLoading(true);
    getUser(selectedTodo.userId)
      .then(setUser)
      .catch((er: Error) => setError(er.message || 'Something went wrong!'))
      .finally(() => setLoading(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {error ? (
        <p className="notification is-danger">{error}</p>
      ) : (
        <>
          {loading && <Loader />}

          {!loading && selectedTodo && user && (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${selectedTodo.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => onCloseTodoModal()}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={classNames({
                      'has-text-success': selectedTodo?.completed,
                      'has-text-danger': !selectedTodo?.completed,
                    })}
                  >
                    {selectedTodo?.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const TodoModal = React.memo(TodoModalComponent);
