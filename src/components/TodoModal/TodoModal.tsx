import React from 'react';
import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  setShowModal: (v: boolean) => void;
  selectedTodo: Todo | null;
  loading: boolean;
  userData: User | undefined;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  setShowModal,
  selectedTodo,
  loading,
  userData,
  setSelectedTodo,
}) => {
  const checkedData = selectedTodo !== null;

  const handleClick = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClick} />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <p
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{checkedData && selectedTodo?.id}
            </p>
            <button
              onClick={handleClick}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {checkedData && selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {checkedData && selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${userData?.email}`}>{userData?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
