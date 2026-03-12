import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';

export interface TodoModalProps {
  selectedTodo: Todo;
  setSelectTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  setSelectTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .finally(() => setLoading(false));
  }, [selectedTodo]);

  return (
    <div
      className={classNames('modal', { 'is-active': !!selectedTodo })}
      data-cy="modal"
    >
      <div className="modal-background" onClick={() => setSelectTodo(null)} />
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
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectTodo(null)}
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
              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
