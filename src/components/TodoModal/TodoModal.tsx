import { useContext, useEffect, useState } from 'react';

import { Loader } from '../Loader';

import { DispatchContext, StateContext } from '../../providers/StateProvider';

import { getUser } from '../../api';

import { User } from '../../types/User';
import { ActionTypes } from '../../types/ActionTypes';

export const TodoModal: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { selectedTodo } = useContext(StateContext);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    getUser(selectedTodo.userId)
      .then(setUser);
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user || !selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Select todo"
              onClick={() => dispatch({
                type: ActionTypes.SELECT_TODO,
                selectedTodo: null,
              })}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )
              }

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
