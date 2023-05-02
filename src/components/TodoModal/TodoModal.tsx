import React, { useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  setModalIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  currentUserId: number,
  getUser: (userId: number) => Promise<User>
  currentTodo: Todo,
}

export const TodoModal: React.FC<Props> = ({
  setModalIsOpened, currentUserId, getUser, currentTodo,
}) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [modalIsLoaded, setModalIsLoaded] = useState(false);
  const user = async () => {
    const curUser = await getUser(currentUserId);

    setCurrentUser(curUser);

    setModalIsLoaded(true);
  };

  if (currentUserId !== currentUser.id) {
    user();
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!modalIsLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalIsOpened(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
