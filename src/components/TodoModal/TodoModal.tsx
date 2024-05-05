import React, { useCallback, useContext } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StateContext } from '../../context/TodoContext';
import classNames from 'classnames';

export const TodoModal: React.FC = () => {
  const { todo, modalLoading } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'modalLoading', modalLoading: false });
    dispatch({ type: 'showModal', isModal: false });
  }, [dispatch]);

  return (
    <div className={
      classNames('modal', {
        'is-active': modalLoading,
      }
      )} data-cy="modal"
    >
      <div className="modal-background" />

      {!modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:${todo?.user.email}`}>{todo?.user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
