import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { DispatchContext } from '../../store/Store';
import { ActionTypes } from '../../store/ActionTypes';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useContext(DispatchContext);

  const { id, title, completed } = todo;

  const close = () => {
    dispatch({
      type: ActionTypes.ToggleTodoModal,
      payload: {
        todo: null,
      },
    });
  };

  useEffect(() => {
    setLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [todo.userId]);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={close}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

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
