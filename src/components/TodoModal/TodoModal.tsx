import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectTodo?: Todo;
};

export const TodoModal: React.FC<Props> = ({ setModalIsOpen, selectTodo }) => {
  const [load, setLoad] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!selectTodo) {
      return;
    }

    getUser(selectTodo.userId).then(resp => {
      setUser(resp);

      if (selectTodo) {
        setLoad(false);
      }
    });
  }, [selectTodo]);

  if (!selectTodo) {
    return null;
  }



  const handleCloseModal = () => {
     setModalIsOpen(false)
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {load ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectTodo.id}
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
              {selectTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}

              <strong className="has-text-danger">
                {selectTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email ?? ''}`}>
                {user?.name ?? 'Пользователь'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
