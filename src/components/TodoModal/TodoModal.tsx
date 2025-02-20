import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getTodos } from '../../api';

interface TodoModalProps {
  isModalOpened: boolean;
  message: (clickButton: boolean) => void;
  title: string;
  id: number[];
}

export const TodoModal: React.FC<TodoModalProps> = ({
  isModalOpened,
  message,
  title,
  id,
}) => {
  const [loading, setLoading] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    if (isModalOpened) {
      setHasClicked(true);
      getTodos().then(() => {
        setLoading(false);
      });
    }
  }, [isModalOpened]);

  if (!isModalOpened) {
    return null;
  }

  const handleCloseClick = () => {
    message(false);
    setHasClicked(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
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
            onClick={handleCloseClick}
          />
        </header>
        <div className="modal-card-body">
          {hasClicked && loading ? (
            <Loader /> // Показуємо loader тільки після кліку
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {title}
              </p>
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>
                {' by '}
                <a href="mailto:Sincere@april.biz">Leanne Graham</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
