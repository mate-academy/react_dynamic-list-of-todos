import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  setLoading: (value: boolean) => void;
  loading: boolean;
  setChosenTodo: (value: Todo | null) => void;
  chosenTodo: Todo;
}

export const TodoModal: React.FC<Props> = ({
  setLoading,
  loading,
  setChosenTodo,
  chosenTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    getUser(chosenTodo.userId)
      .then(userData => setUser(userData))
      .finally(() => setLoading(false));
  }, [chosenTodo.userId, setLoading]);

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
              Todo #{chosenTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setChosenTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {chosenTodo.title}
            </p>

            {chosenTodo.completed ? (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-success">Done</strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
