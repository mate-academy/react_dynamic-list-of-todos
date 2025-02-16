import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { ModalContext } from '../../contexts/ModalContext';

export const TodoModal: React.FC = () => {
  const {
    showModal,
    userDataInModal,
    todoDataInModal,
    loadingModalState,
    setModalContext,
  } = useContext(ModalContext)!;

  return (
    <>
      {showModal && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {loadingModalState ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{todoDataInModal.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => setModalContext(undefined)}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todoDataInModal.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  {todoDataInModal.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href="mailto:Sincere@april.biz">{userDataInModal.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
