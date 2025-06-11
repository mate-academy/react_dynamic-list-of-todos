import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type TodoModalProps = {
  setEyeWasPressed: (val: boolean) => void;
  chosenTodo?: Todo | null;
  setChosenTodo: (val: Todo | null) => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  setEyeWasPressed,
  chosenTodo,
  setChosenTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    if (!chosenTodo) {
      return;
    }

    setIsLoadingUser(true);
    getUser(chosenTodo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsLoadingUser(false));
  }, [chosenTodo]);

  return isLoadingUser ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <Loader />
    </div>
  ) : (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${chosenTodo?.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => {
              setEyeWasPressed(false);
              setChosenTodo(null);

              const slashEye = document.querySelector(
                '.fa-eye-slash',
              ) as HTMLElement;

              slashEye.classList.toggle('fa-eye-slash');
              slashEye.classList.toggle('fa-eye');
            }}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {chosenTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong
              className={
                chosenTodo?.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {chosenTodo?.completed ? 'Done' : 'Planned'}
            </strong>

            {' by '}

            <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
