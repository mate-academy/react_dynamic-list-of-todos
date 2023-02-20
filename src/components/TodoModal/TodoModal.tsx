import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  onHideTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onHideTodo,
}) => {
  const [selectedTodo] = useState<Todo | undefined>(
    todos.find((todo) => todo.id === selectedTodoId),
  );
  const [selectedTodoUser, setSelectedTodoUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then((user) => setSelectedTodoUser(user));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedTodo || !selectedTodoUser ? (
        <Loader />
      ) : (
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
              onClick={onHideTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn({
                  'has-text-success': selectedTodo.completed,
                  'has-text-danger': !selectedTodo.completed,
                })}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{selectedTodoUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
