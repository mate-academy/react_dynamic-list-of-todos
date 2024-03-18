import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  handleSelectedTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedTodo.userId]);

  const handleClosingSelectedTodo = () => {
    handleSelectedTodo(undefined);
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
              onClick={handleClosingSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:{{user?.email}}">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
