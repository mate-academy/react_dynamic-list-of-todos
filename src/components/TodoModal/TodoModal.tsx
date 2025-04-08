import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const { id, title } = selectedTodo;

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setLoaded(true);

    if (selectedTodo?.userId !== undefined) {
      getUser(selectedTodo?.userId)
        .then(data => setCurrentUser(data))
        .finally(() => setLoaded(false));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  selectedTodo.completed
                    ? 'has-text-seccess'
                    : 'has-text-danger'
                }
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
