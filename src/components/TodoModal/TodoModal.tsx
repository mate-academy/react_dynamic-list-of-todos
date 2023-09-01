import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type TodoModalProps = {
  todo: Todo & { user?: User } | null;
  setTodo: React.Dispatch<React.SetStateAction<Todo & { user?: User } | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  setTodo,
  setShowModal,
}) => {
  const [loading, setLoading] = useState(false);

  const selectUser = () => {
    if (todo) {
      setLoading(true);
      getUser(todo.userId)
        .then(user => {
          setTodo(prevTodo => ({
            ...prevTodo,
            user,
          }) as Todo & { user: User });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTodo(null);
  };

  useEffect(() => {
    selectUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={todo?.completed
                  ? 'has-text-success' : 'has-text-danger'}
              >
                {todo?.completed ? (
                  'Done'
                ) : (
                  'Planned'
                )}
              </strong>

              {' by '}

              <a href={`mailto:${todo?.user?.email}`}>
                {todo?.user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
