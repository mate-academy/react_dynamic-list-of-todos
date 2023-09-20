import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type TodoModalProps = {
  setSelectedTodoId: (todoId: number) => void;
  selectedTodoId: number;
  todos: Todo[];
};

export const TodoModal: React.FC<TodoModalProps> = ({
  setSelectedTodoId, selectedTodoId, todos,
}) => {
  const [todoSelectedUser, setTodoSelectedUser] = useState<User | null>(null);
  // eslint-disable-next-line max-len
  const todoSelected: Todo | null = todos.find(todo => todo.id === selectedTodoId)
  || null;

  useEffect(() => {
    if (todoSelected) {
      getUser(todoSelected?.userId)
        .then((data) => {
          setTodoSelectedUser(data);
        });
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoSelectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoSelected?.id}`}
            </div>

            {todoSelected
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                title="close"
                onClick={() => setSelectedTodoId(0)}
              />
            )}

          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoSelected?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': todoSelected?.completed,
                  'has-text-danger': !todoSelected?.completed,
                })}
              >
                {todoSelected?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${todoSelectedUser?.email}`}>
                {todoSelectedUser && todoSelectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
