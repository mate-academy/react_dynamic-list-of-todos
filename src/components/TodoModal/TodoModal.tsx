import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodoId: number;
  removeTodo: () => void;
  todos: Todo[];
}

export const TodoModal: React.FC<Props> = ({
  selectedTodoId,
  removeTodo,
  todos,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const newSelectedTodo = todos.find((todo) => todo.id === selectedTodoId);

    if (!newSelectedTodo) {
      setSelectedTodo(null);
      return;
    }

    setSelectedTodo(newSelectedTodo);
  }, [selectedTodoId]);

  useEffect(() => {
    if (selectedTodo) {
      const fetchUser = async () => {
        try {
          const userData = await getUser(selectedTodo.userId);

          setUser(userData);
        } catch {
          setUser(null);
        }
      };

      fetchUser();
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedTodo || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': selectedTodo.completed,
                  'has-text-danger': !selectedTodo.completed,
                })}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
