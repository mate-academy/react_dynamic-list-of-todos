import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../Store';
import { Loader } from '../Loader';
import { getUser } from '../../api/user';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { ActionType } from '../../types/Action';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { user, isLoadingUser } = useContext(StateContext);

  const handleModalClose = () => {
    dispatch({
      type: ActionType.setOpenedTodo,
      payload: {
        id: 0,
        title: '',
        completed: false,
        userId: 0,
      },
    });
    dispatch({ type: ActionType.setIsModalOpened, payload: false });
    dispatch({ type: ActionType.setIsLoadingUser, payload: true });
  };

  useEffect(() => {
    getUser(todo.userId).then((userFromServer: User) => {
      dispatch({ type: ActionType.setUser, payload: userFromServer });
      dispatch({ type: ActionType.setIsLoadingUser, payload: false });
    });
  }, [todo, dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              data-cy="modal-header"
              className="modal-card-title has-text-weight-medium"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              data-cy="modal-close"
              className="delete"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p data-cy="modal-title" className="block">
              {todo.title}
            </p>

            <p data-cy="modal-user" className="block">
              <strong
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

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
