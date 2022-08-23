import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[]
  selectedTodoId: string
  onSelectTodo: (selectId: number) => void
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  // const findId = todos.find(todo => todo.id === +selectedTodoId)?.userId;

  useEffect(() => {
    getUser(todos.find(todo => todo.id
      .toString() === selectedTodoId)?.userId || 0).then(setUser);
  }, []);

  const selectedToDo = todos
    .find(todo => todo.id
      .toString() === selectedTodoId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedToDo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              value={selectedTodoId}
              onClick={() => onSelectTodo(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedToDo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedToDo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
