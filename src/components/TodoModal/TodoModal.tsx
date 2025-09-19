import React from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface PropType {
  showModal: boolean;
  userData?: User;
  loadModal: boolean;
  modalClose: () => void;
  todo?: Todo;
}
export const TodoModal: React.FC<PropType> = ({
  showModal,
  userData,
  loadModal,
  modalClose,
  todo,
}) => {
  return showModal ? (
    <div
      className={classNames({
        modal: true,
        'is-active': showModal,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loadModal ? (
        <Loader loadingStatus={loadModal} />
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
              onClick={modalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-success">
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}

              <a href={`mailto:${userData?.email}`}>{userData?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  ) : null;
};
