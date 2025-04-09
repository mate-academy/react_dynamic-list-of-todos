import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
type Props = {
  todoData: Todo[] | null;
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
};

export const TodoModal: React.FC<Props> = ({
  todoData,
  selectedId,
  setSelectedId,
}) => {
  const [loading, setLoading] = useState(true);
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(
    todoData?.find(todo => todo.id === selectedId) || undefined,
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo.userId)
        .then(setUser)
        .catch(error => {
          throw new Error(error.message);
        })
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

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
              Todo #{currentTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedId(0);
                setUser(null);
                setLoading(true);
                setCurrentTodo(undefined);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currentTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
