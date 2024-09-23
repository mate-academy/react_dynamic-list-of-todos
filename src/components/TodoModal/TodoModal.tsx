import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type TodoModalProps = {
  todo: Todo;
  onClose: () => void;
}
export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo) {
      setLoading(true);
      getUser(todo.userId).then(userFromServer => {
        setSelectedUser(userFromServer);
        setLoading(false);
      });
    }}, [todo]
    );

  if (loading) {
    return (
      <div className="modal is-active"  data-cy="modal">
      <div className="modal-background">
        <Loader />
      </div>
      </div>
    )
    }

    if (!todo || !selectedUser) {
      return null;
    }

  return (
    <div
      className="modal is-active"
      data-cy="modal"
      onClick={onClose}
      >
      <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
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
            <p className="block" data-cy="modal-title">
             {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={todo.completed ? "has-text-success" : "has-text-danger"}>
              {todo.completed ? "Done" : "Planned"}</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{selectedUser.name}</a>
            </p>
          </div>
        </div>
    </div>
    );
  }
