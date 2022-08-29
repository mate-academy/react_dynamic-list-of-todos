import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todos: Todo[];
  selectedTodoId: number;
  onSelect: (id: number | null) => void;
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectedTodoId, todos, onSelect } = props;
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const getSelectedTodo = () => {
    return todos.find(todo => todo.id === selectedTodoId) || todos[0];
  };

  const todo = getSelectedTodo();

  useEffect(() => {
    setIsModalLoading(true);
    getUser(todo.userId)
      .then(foundUser => setUser(foundUser))
      .finally(() => setIsModalLoading(false));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSelect(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
