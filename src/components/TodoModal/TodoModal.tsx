import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onClose,
}) => {
  const [selectedTodoUser, setSelectedTodoUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(result => {
          setSelectedTodoUser(result || null);
          setIsLoading(false);
        });
    }
  }, [selectedTodo]);

  const handleCloseClick = () => {
    onClose();
    setIsLoading(true);
  };

  return (selectedTodo && (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              onClick={handleCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong> }

              {' by '}

              <a href={`mailto:${selectedTodoUser?.email}`}>
                {selectedTodoUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  ));
};
