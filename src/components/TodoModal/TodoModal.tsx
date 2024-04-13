import React from 'react';
import { getUser } from '../../api';

import { useTodoState, useTodoDispatch } from '../TodoProvider';
import { Loader } from '../Loader';

const TodoModal: React.FC = () => {
  const { selectedTodo, user, modalVisible, isLoadingUsers } = useTodoState();
  const dispatch = useTodoDispatch();

  React.useEffect(() => {
    if (selectedTodo?.userId) {
      dispatch({
        type: 'FETCH_USERS',
      });
      getUser(selectedTodo.userId).then(currUser => {
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          payload: currUser,
        });
      });
    }
  }, [selectedTodo?.userId, dispatch]);

  if (!modalVisible) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
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
              <strong
                className={
                  selectedTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TodoModal);
