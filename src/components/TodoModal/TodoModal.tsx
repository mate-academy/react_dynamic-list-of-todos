import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import classNames from 'classnames';

type Props = {
  todoData: Todo | undefined;
  userData: User | undefined;
  setModal: (status: boolean) => void;
  setSelectedId: (id: number | null) => void;
};

export const TodoModal: React.FC<Props> = memo(
  ({ todoData, userData, setModal, setSelectedId }) => {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!todoData || !userData ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todoData.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setModal(false);
                  setSelectedId(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todoData.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': todoData.completed,
                    'has-text-danger': !todoData.completed,
                  })}
                >
                  {todoData.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${userData.email}`}>{userData.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

TodoModal.displayName = 'TodoModal';
