import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import {
  EyeClickContext,
  ModalIdContext,
  ShowModalContext,
} from '../context/stateContext';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface PropsTodo {
  user: User | undefined;
  todos: Todo[];
}

export const TodoModal: React.FC<PropsTodo> = ({ user, todos }) => {
  const { isClicked, setIsClicked } = useContext(EyeClickContext);
  const { setisModalShowed } = useContext(ShowModalContext);
  const { currentId, setCurrentId } = useContext(ModalIdContext);

  useEffect(() => {
    setTimeout(() => {
      setIsClicked(true);
    }, 300);
  }, [setIsClicked]);

  const handleModaleClose = () => {
    setCurrentId(0);
    setisModalShowed(false);
    setIsClicked(false);
  };

  const handleClickOnEmail = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const nededTodo = todos.find(todo => todo.id === currentId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isClicked ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${nededTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleModaleClose}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {`${nededTodo?.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  todos[currentId - 1].completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {todos[currentId - 1].completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a
                onClick={handleClickOnEmail}
                href={user?.email}
              >{`${user?.name}`}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
