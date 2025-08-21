import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';

type Props = {
  selectedTodo: Todo | null;
  unselectTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, unselectTodo }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // const [modalErrorMessage, setModalErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setUser(null);
    // setModalErrorMessage('');
    setModalLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      // .catch(() => setModalErrorMessage('User loading failed!'))
      .finally(() => setModalLoading(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={unselectTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': selectedTodo?.completed,
                  'has-text-danger': !selectedTodo?.completed,
                })}
              >
                {`${selectedTodo?.completed ? 'Done' : 'Planned'}`}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
