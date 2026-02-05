import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type TodoModalProp = {
  todo: Todo;
  onSelectTodo: (value: null) => void;
};

export const TodoModal = ({ todo, onSelectTodo }: TodoModalProp) => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUser(todo.userId)
      .then(user => {
        setActiveUser(user);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setActiveUser(null);
    };
  }, [todo.userId]);

  const handleClick = () => {
    onSelectTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
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
              onClick={handleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={'mailto:' + activeUser?.email}>{activeUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
