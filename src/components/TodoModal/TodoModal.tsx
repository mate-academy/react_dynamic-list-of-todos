import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type TodoModalProps = {
  todoId?: number;
  onClose: () => void;
}
export const TodoModal: React.FC<TodoModalProps> = ({ todoId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    useEffect(() => {
      if (todoId) {
        setLoading(true);
        getTodos().then(todosFromServer => {
          const todo = todosFromServer.find(todo => todo.id === todoId);
          if (todo) {
            setSelectedTodo(todo);

            getUser(todo.userId).then(userFromServer => {
              setSelectedUser(userFromServer);
              setLoading(false);
            });
          } else {
            setLoading(false);
          }
        });
      }
    }, [todoId])

    console.log(loading)

  if (loading) {
  return (
    <div className="modal is-active"  data-cy="modal">
    <div className="modal-background">
      <Loader />
    </div>
    </div>
  )
  }

  if (!selectedTodo || !selectedUser) {
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
              Todo #{selectedTodo.id}
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
             {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={selectedTodo.completed ? "has-text-success" : "has-text-danger"}>
              {selectedTodo.completed ? "Done" : "Planned"}</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{selectedUser.name}</a>
            </p>
          </div>
        </div>
    </div>
    );
  }
