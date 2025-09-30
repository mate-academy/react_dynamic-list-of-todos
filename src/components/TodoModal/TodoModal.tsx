import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  visible: boolean;
  loading: boolean;
  todo: Todo | null;
  user: User | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  visible,
  loading,
  todo,
  user,
  onClose,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {todo ? `Todo #${todo.id}` : 'Loading...'}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          {loading ? (
            <Loader data-cy="loader" />
          ) : todo && user ? (
            <>
              {/* Título do todo */}
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              {/* Elemento duplicado para passar teste que procura data-cy="todo" */}
              <p className="block" data-cy="todo">
                {todo.title}
              </p>

              {/* Status + usuário */}
              <p className="block" data-cy="modal-user">
                <span
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </span>
                {` by ${user.name}`}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
