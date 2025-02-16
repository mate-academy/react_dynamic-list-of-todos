import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  onClose: () => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ onClose, selectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  }, [selectedTodo.userId]);

  const handleRetry = () => {
    setErrorMessage('');
    setLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : errorMessage.length > 0 ? (
        <div
          className="modal-card"
          style={{ borderRadius: '16px', maxWidth: '500px', margin: '0 auto' }}
        >
          <div className="modal-card-body">
            <div
              className="notification"
              style={{
                borderRadius: '12px',
                border: '1px solid #F0F0F0',
                background: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                padding: '2rem',
              }}
            >
              <div className="content has-text-centered">
                <div className="mb-4">
                  <span className="icon is-large" style={{ color: '#4A5568' }}>
                    <i className="fas fa-user-slash fa-2x"></i>
                  </span>
                </div>

                <h2
                  className="title is-4 mb-4"
                  style={{
                    color: '#2D3748',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  User Data Unavailable
                </h2>

                <div
                  className="block"
                  style={{
                    background: '#F7FAFC',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    margin: '1.5rem 0',
                  }}
                >
                  <p
                    className="has-text-grey-darker mb-3"
                    style={{ color: '#718096' }}
                  >
                    {"We couldn't load user information. Please:"}
                  </p>
                  <ul
                    className="is-size-6 has-text-left"
                    style={{
                      color: '#4A5568',
                      lineHeight: '1.6',
                    }}
                  >
                    <li className="mb-2">
                      <span className="icon" style={{ color: '#48BB78' }}>
                        <i className="fas fa-wifi"></i>
                      </span>
                      Check network connection
                    </li>
                    <li className="mb-2">
                      <span className="icon" style={{ color: '#4299E1' }}>
                        <i className="fas fa-sync"></i>
                      </span>
                      Reload the data
                    </li>
                    <li>
                      <span className="icon" style={{ color: '#F6AD55' }}>
                        <i className="fas fa-life-ring"></i>
                      </span>
                      Contact support
                    </li>
                  </ul>
                </div>

                <button
                  className="button is-medium"
                  style={{
                    background: '#4299E1',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '0 2rem',
                    height: '48px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    border: 'none',
                  }}
                  onClick={handleRetry}
                >
                  <span className="icon">
                    <i className="fas fa-redo"></i>
                  </span>
                  <span>Retry</span>
                </button>

                <div
                  className="mt-3"
                  style={{
                    color: '#718096',
                    fontSize: '0.875rem',
                    backgroundColor: '#F7FAFC',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    marginTop: '1.5rem',
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-info-circle"></i>
                  </span>
                  Error details: {errorMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {user && (
                <>
                  {' by '}

                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
