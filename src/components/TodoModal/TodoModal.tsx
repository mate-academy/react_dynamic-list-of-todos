import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
type Props = {
  todoData: Todo[] | null;
  selectedId: number;
  selectedUserId: number;
  setSelectedId: (newId: number) => void;
  setSelectedUserId: (newId: number) => void;
};

export const TodoModal: React.FC<Props> = ({
  todoData,
  selectedId,
  selectedUserId,
  setSelectedId,
  setSelectedUserId,
}) => {
  const [loading, setLoading] = useState(true);
  // const [errorMessage, setErrorMeddage] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId)
      .then(setUser)
      // .catch(error => setErrorMeddage(error.message))
      .finally(() => {
        setLoading(false);
      });

    setCurrentTodo(() => todoData?.find(todo => todo.id === selectedId));
  }, [todoData, selectedUserId, selectedId]);

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
                setSelectedUserId(0);
                setUser(null);
                setLoading(true);
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
