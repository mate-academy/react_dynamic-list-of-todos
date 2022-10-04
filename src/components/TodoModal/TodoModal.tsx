import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo | null,
  callback: Dispatch<SetStateAction<Todo | null>>
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, callback }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleDeletButton = () => {
    callback(null);
    setUser(null);
  };

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    getUser(selectedTodo.userId)
      .then(setUser);
  }, [selectedTodo]);

  return selectedTodo && (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (<Loader />)

        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              <button
                type="button"
                className="delete"
                aria-label="delete"
                data-cy="modal-close"
                onClick={handleDeletButton}
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
