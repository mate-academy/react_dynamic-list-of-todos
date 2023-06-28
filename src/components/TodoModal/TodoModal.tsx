import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  selectedTodo: Todo
  isSelected: boolean,
  setIsSelected: (value: boolean) => void,
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  isSelected,
  setIsSelected,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser)
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  });

  if (isSelected) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!user ? (
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

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setIsSelected(false)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                {selectedTodo.completed
                  ? <strong className="has-text-success">Completed</strong>
                  : <strong className="has-text-danger">Planned</strong>}

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
  }

  return null;
};
