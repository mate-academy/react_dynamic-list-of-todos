import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo, TodoWithUser } from '../../types/Todo';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo;
  setSelectTodo: (val: null) => void;
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, setSelectTodo }) => {
  const [todoWithUser, setTodoWithUser] = useState<TodoWithUser | null>(null);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(userFromServer => {
        setTodoWithUser({
          ...selectedTodo,
          user: userFromServer,
        });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        setSelectTodo(null);
      });
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoWithUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoWithUser.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoWithUser.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todoWithUser.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${todoWithUser.user.email}`}>
                {todoWithUser.user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
