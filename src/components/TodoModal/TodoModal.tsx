import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null;
  onSelectTodoId: (id: number) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onSelectTodoId,
}) => {
  const [selectedUser, setSelectedUser] = useState<User>({
    email: '',
    id: 0,
    name: '',
    phone: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);
  let selectedUserId = 0;
  const { name, email } = selectedUser;

  if (selectedTodo) {
    selectedUserId = selectedTodo.userId;
  }

  const handleClick = (id: number) => {
    onSelectTodoId(id);
  };

  useEffect(() => {
    getUser(selectedUserId).then((response) => {
      setSelectedUser(response);
      setIsLoaded(true);
    });
  }, []);

  return selectedTodo && (
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
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleClick(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
