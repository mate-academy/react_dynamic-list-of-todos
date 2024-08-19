import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { GetTodoContext, GetUserContext } from '../../store';
import { getUser } from '../../api';

type Props = {
  setIsOpenedPost: React.Dispatch<React.SetStateAction<boolean>>,
}

export const TodoModal: React.FC<Props> = ({ setIsOpenedPost }) => {
  const { todo, setTodo } = useContext(GetTodoContext);
  const { user, setUser } = useContext(GetUserContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    todo?.userId && getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsLoaded(true))
  }, []);

  const closeModalWindow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpenedPost(false);
    setTodo(null);
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModalWindow}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
