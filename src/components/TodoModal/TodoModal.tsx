import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  setIsClicked: (isSelected: boolean) => void;
  selectedTodo: Todo | null;
  setSelectedUserId: (id: number) => void
};

export const TodoModal: React.FC<Props> = ({
  setIsClicked,
  selectedTodo,
  setSelectedUserId: setSelectedId,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(user => {
          setSelectedUser(user);
          setIsLoaded(true);
        });
    }
  }, []);

  const isTodo = selectedTodo && selectedUser;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(!isLoaded ? (
        <Loader />
      ) : isTodo && (
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
              onClick={() => {
                setIsClicked(false);
                setSelectedId(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={selectedUser.email}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
