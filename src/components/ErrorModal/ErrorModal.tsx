import React from 'react';

// Визначаємо типи для пропсів нашого компонента
interface Props {
  error: string;
  onClose: () => void;
  onReload?: () => void;
}

export const ErrorModal: React.FC<Props> = ({ error, onClose, onReload }) => {
  if (!error) {
    return null;
  }

  /* eslint-disable no-console */
  console.log('render ErrorModal');

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Something went wrong
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          <div className="notification is-danger" data-cy="error-notification">
            {error}
          </div>

          {onReload && (
            <button className="button is-danger" onClick={onReload}>
              Reload
            </button>
          )}
        </section>
      </div>
    </div>
  );
};
