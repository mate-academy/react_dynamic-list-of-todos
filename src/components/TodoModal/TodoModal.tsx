import { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { TodoContext } from '../TodoContext';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const {
    selectedTodo, setSelectedTodo,
  } = useContext(TodoContext);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then((response => {
          setSelectedUser(response);
        }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

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
            onClick={() => {
              setSelectedTodo(null);
              setSelectedUser(null);
            }}
          />
        </header>
        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {selectedTodo?.completed
              ? <strong className="has-text-success">Done</strong>
              : <strong className="has-text-danger">Planned</strong>}
            {' by '}
            {!selectedUser
              ? <Loader />
              : (
                <a href={`mailto:${selectedUser.email}`}>
                  {selectedUser.name}
                </a>
              )}
          </p>
        </div>
      </div>
    </div>
  );
};
