import React, { useEffect } from 'react';
import { useTodo } from '../../context/TodoContext';
import { Loader } from '../Loader';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const {
    handleModalClose,
    selectedTodo,
    users,
    loading,
    todos,
    setLoading,
    setUsers,
  } = useTodo();

  useEffect(() => {
    if (todos.length > 0) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const userIds = Array.from(new Set(todos.map(todo => todo.userId)));
          const allUsers = await Promise.all(
            userIds.map(userId => getUser(userId)),
          );

          setUsers(allUsers);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [todos]);

  const modalUser = users.find(user => user.id === selectedTodo?.userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodo?.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleModalClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo?.title}
          </p>

          {loading ? (
            <Loader />
          ) : modalUser ? (
            <p className="block" data-cy="modal-user">
              <strong
                className={
                  selectedTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${modalUser.email}`}>{modalUser.name}</a>
            </p>
          ) : (
            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">User not found</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
