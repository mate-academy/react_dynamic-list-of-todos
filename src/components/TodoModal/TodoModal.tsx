import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  selectedTodo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  } | null;
};

export const TodoModal: React.FC<Props> = ({
  setIsModalOpen,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId).then(response => {
        setUser(response);
        setIsLoading(false);
      });
    }
  }, [selectedTodo]);

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
              {selectedTodo ? `Todo #${selectedTodo.id}` : 'Todo'}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setIsModalOpen(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo ? selectedTodo.title : 'No title'}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-success': selectedTodo?.completed,
                  'has-text-danger': !selectedTodo?.completed,
                })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
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
