import React, { ReactEventHandler, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  onClose: ReactEventHandler;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (id: number) => {
      const data = await getUser(id);

      setUser(data);
    };

    fetchUser(selectedTodo.userId);
  }, [selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
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
            onClick={onClose}
          />

        </header>
        <div className="modal-card-body">
          {!user ? (
            <Loader />
          ) : (
            <>
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
                <a href={`mailto:${user?.email}`}>{user?.name ?? 'Anonymous'}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
