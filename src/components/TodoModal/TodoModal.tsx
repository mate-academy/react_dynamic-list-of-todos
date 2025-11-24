import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  onCloseTodo: () => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onCloseTodo }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [errorUserMessage, setErrorUserMessage] = useState('');

  const { id, title, completed } = selectedTodo;
  const name = user ? user.name : '';
  const email = user ? user.email : '';

  useEffect(() => {
    setLoading(true);
    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => {
        setErrorUserMessage('Try reload user later');
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading && <Loader />}

      {!loading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {!errorUserMessage && <a href={`mailto:${email}`}>{name}</a>}
              {errorUserMessage && (
                <span className="notification is-danger">
                  {errorUserMessage}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
