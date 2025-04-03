import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { TodoContext } from '../TodoContext/TodoContext';
import cn from 'classnames';

export const TodoModal: React.FC = () => {
  // eslint-disable-next-line max-len
  const { selectedTodo, selectedUser, setSelectedTodo, isModalLoading } =
    useContext(TodoContext);

  const handleClose = () => {
    setSelectedTodo(null);
  };

  if (!selectedTodo && !isModalLoading) {
    return null;
  }

  return (
    <div
      className={cn('modal', {
        'is-active': isModalLoading || selectedTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isModalLoading && <Loader />}

      {!isModalLoading && !!selectedTodo && selectedUser && (
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
              onClick={handleClose}
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

              {' by '}

              <a href="mailto:Sincere@april.biz">{selectedUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
