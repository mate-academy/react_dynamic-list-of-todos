import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { TodoModalProps } from './TodoModal.types';
import { getUser } from '../../utils/getUser';

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [userName, setUserName] = useState('');
  const [userIsLoading, setUserIsLoading] = useState(false);
  const targetUserId = selectedTodo?.userId;

  useEffect(() => {
    if (targetUserId) {
      setUserIsLoading(true);
      getUser(targetUserId)
        .then(user => {
          setUserName(user.name);
        })
        .finally(() => {
          setUserIsLoading(false);
        });
    }
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userIsLoading ? (
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
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{userName}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
