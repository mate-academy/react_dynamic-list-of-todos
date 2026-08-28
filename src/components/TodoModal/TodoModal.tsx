import React from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  onClose: () => void;
  loading: boolean;
  user: User | null;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onClose,
  loading,
  user,
}) => {
  return (
    <>
      {selectedTodo && (
        <div className="modal is-active" data-cy="modal">
          {loading ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{selectedTodo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={onClose}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={classNames({
                      'has-text-success': selectedTodo.completed,
                      'has-text-danger': !selectedTodo.completed,
                    })}
                  >
                    {selectedTodo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
