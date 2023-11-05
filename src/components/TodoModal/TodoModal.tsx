import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../TodosProvider';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const {
    selectedTodo,
    setSelectedTodo,
    setIsTodoSelected,
  } = useContext(TodosContext);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(selectedTodo.userId);

      setUser(userData);
    };

    if (selectedTodo) {
      fetchData();
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${selectedTodo?.id}`}
          </div>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => {
              setSelectedTodo({
                title: '',
                completed: false,
                id: 0,
                userId: 0,
              });
              setIsTodoSelected(false);
            }}
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
            <a href={`mailto:${user?.email}`}>
              {user?.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
