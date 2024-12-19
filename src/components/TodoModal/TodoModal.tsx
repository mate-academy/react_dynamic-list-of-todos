import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = props => {
  const { selectedTodo, closeModal } = props;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(selectedTodo.userId)
      .then(data => {
        setUser(data);
      })
      .finally(() => setIsLoading(false));
  }, [selectedTodo.userId]);

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.code === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', closeByEscape);

    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeModal]);

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
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': selectedTodo.completed,
                  'has-text-danger': !selectedTodo.completed,
                })}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a
                href={`mailto:${user?.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
