import React, {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getSelectedUser } from '../../utils/helpers';

type Props = {
  selectedTodo: Todo,
  clearSelectedTodo: () => void,
  setHasRequestError: Dispatch<SetStateAction<boolean>>,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  clearSelectedTodo,
  setHasRequestError,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getSelectedUser(
      selectedTodo.userId,
      setSelectedUser,
      setHasRequestError,
    );
  }, []);

  const closeTodoModal = () => {
    setSelectedUser(null);
    clearSelectedTodo();
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { !selectedTodo || !selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              { selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
