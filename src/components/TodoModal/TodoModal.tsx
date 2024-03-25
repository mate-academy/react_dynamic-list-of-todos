import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
  loading: boolean;
  setLoading: (condition: boolean) => void;
  setIsTodoModalShown: (condition: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
  loading,
  setLoading,
  setIsTodoModalShown,
}) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    getUser(selectedTodo.userId)
      .then(data => {
        setUserData(data);
      })
      .finally(() => setLoading(false));
  }, [selectedTodo.userId, setLoading]);

  const handleCloseButton = () => {
    setIsTodoModalShown(false);
    setSelectedTodo(null);
  };

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
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseButton}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{userData?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
