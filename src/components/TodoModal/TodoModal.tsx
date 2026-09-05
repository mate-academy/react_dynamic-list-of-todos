import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodoId: number | null;
  todos: Todo[];
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoId,
  todos,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [load, setLoad] = useState(true);
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

    if (typeof selectedTodoId === 'number' && selectedTodo) {
      setLoad(true);
      getUser(selectedTodo.userId).then(person => {
        setUser(person);
        setLoad(false);
      });
    }
  }, [todos, selectedTodoId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {load ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
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
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
