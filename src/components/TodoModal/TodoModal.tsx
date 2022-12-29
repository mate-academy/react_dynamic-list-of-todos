import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
  selectTodo: (todoId: number) => void,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, selectTodo }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUser(selectedTodo.userId)
      .then(result => {
        setUser(result);
        setLoading(false);
      });
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
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodo(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {selectedTodo.completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
