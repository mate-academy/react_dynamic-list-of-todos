import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setUserInfo)
        .finally(() => setLoading(false));
    }
  }, [selectedTodo]);

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
              Todo #{selectedTodo?.id}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${userInfo?.email}`}>{userInfo?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
