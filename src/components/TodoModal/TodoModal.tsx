import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setSelectedTodo: (value: Todo | null) => void;
  selectedTodo: Todo;
};

const TodoModalComponent: React.FC<Props> = ({
  setSelectedTodo,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => setErrorMessage('User display error'))
      .finally(() => setLoading(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}
      {!loading && errorMessage && (
        <div className="ModalCard">
          <p>{errorMessage}</p>
        </div>
      )}
      {!loading && !errorMessage && (
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
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  selectedTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const TodoModal = React.memo(TodoModalComponent);
