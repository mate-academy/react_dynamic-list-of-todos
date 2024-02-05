import cn from 'classnames';
import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { TodosContext } from '../State';

export const TodoModal: React.FC = React.memo(() => {
  const {
    user,
    selectTodo,
    setSelectTodo,
    isLoadingModal,
  } = useContext(TodosContext);

  if (!selectTodo || !user) {
    return null;
  }

  const { title, id, completed } = selectTodo;
  const { email, name } = user;

  const handleUser = () => {
    setSelectTodo(null);
  };

  return (
    <>
      {isLoadingModal
        ? (
          <div className="modal is-active" data-cy="modal">
            <div className="modal-background" />
            <Loader />
          </div>
        ) : (
          <div className="modal is-active" data-cy="modal">
            <div className="modal-background" />

            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={handleUser}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong className={cn('has-text-success',
                    { 'has-text-danger': !completed })}
                  >
                    {completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${email}`}>
                    {name}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
    </>
  );
});
