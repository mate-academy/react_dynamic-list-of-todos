import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { DispatchContext, StateContext } from '../Store';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { selectedTodo } = useContext(StateContext);
  const [user, setUser] = useState<User>();
  const dispatch = useContext(DispatchContext);

  const handleSelectedDelete = () => {
    dispatch({ type: 'cancelSelection' });
  };

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [selectedTodo]);

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
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleSelectedDelete}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

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
