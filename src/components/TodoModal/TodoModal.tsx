import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo,
  onCloseModal: (value: null) => void,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onCloseModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserTodo = async () => {
      try {
        const userData = await getUser(selectedTodo.userId);

        setUser(userData);
      } catch (error) {
        throw new Error('no such user');
      } finally {
        setIsLoading(false);
      }
    };

    getUserTodo();
  }, []);

  return (
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
              onClick={() => onCloseModal(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              {user === null
                ? (
                  <p>No such user</p>
                )
                : (
                  <a href={`mailto:${user.email}`}>
                    {user.name}
                  </a>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
