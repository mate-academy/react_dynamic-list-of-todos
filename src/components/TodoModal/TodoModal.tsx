import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StateContext } from '../../types/Store';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { todos, selectedTodoId } = state;

  const deleteModal = () => {
    dispatch({
      type: 'setSelectedTodoId',
      payload: 0,
    });
  };

  const findTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    if (!findTodo?.userId) {
      return;
    }

    getUser(findTodo?.userId).then(data => {
      setUser(data);
    });
  }, [findTodo?.userId]);

  if (!findTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${findTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={deleteModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {`${findTodo.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
