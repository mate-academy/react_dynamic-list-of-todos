import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { DispatchContext, StateContext } from '../../Store';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { todoModal } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todoModal) {
      setLoading(true);
      getUser(todoModal.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todoModal]);

  const closeModal = () => {
    dispatch({ type: 'setTodoModal', payload: null });
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoModal?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoModal?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn({
                  'has-text-danger': !todoModal?.completed,
                  'has-text-success': todoModal?.completed,
                })}
              >
                {`${todoModal?.completed ? 'Done' : 'Planned'}`}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
