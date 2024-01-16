import React, { useEffect, useState, FC } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface LoadingProps {
  onClose: () => void;
}

const LoadingContent: FC<LoadingProps> = ({ onClose }) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" />
    <Loader />
    <button
      type="button"
      className="delete"
      data-cy="modal-close"
      aria-label="Close Modal"
      onClick={onClose}
    />
  </div>
);

interface ErrorProps {
  onClose: () => void;
  errorMessage: string;
}

const ErrorContent: FC<ErrorProps> = ({ onClose, errorMessage }) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" />
    <div className="modal-card">
      <div className="modal-card-head">
        <button
          type="button"
          className="delete"
          data-cy="modal-close"
          aria-label="Close Modal"
          onClick={onClose}
        />
      </div>
      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">
          {errorMessage}
        </p>
      </div>
    </div>
  </div>
);

interface Props {
  selected: Todo;
  onClose: () => void;
}

export const TodoModal: FC<Props> = React.memo(({ selected, onClose }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUser(selected.userId)
      .then((user) => {
        setSelectedUser(user);
        setErrorMessage('');
      })
      .catch(() => setErrorMessage('Cannot find a user'))
      .finally(() => setLoading(false));
  }, [selected]);

  if (loading) {
    return <LoadingContent onClose={onClose} />;
  }

  if (errorMessage) {
    return <ErrorContent onClose={onClose} errorMessage={errorMessage} />;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${selected.id}`}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            aria-label="Close Modal"
            onClick={onClose}
          />
        </header>
        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selected.title}
          </p>
          <p className="block" data-cy="modal-user">
            {selected.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
});
